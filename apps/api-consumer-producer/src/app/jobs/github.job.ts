import { HttpService, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { ProjectEntity } from "@parachain-tracker/models"
import { Job } from "./jobs.module"
import { InjectRepository } from "@nestjs/typeorm"
import { EMPTY, forkJoin, from } from "rxjs"
import { catchError, concatMap, map } from "rxjs/operators"

const parse = require("parse-link-header")

const headers = {
    Authorization: `Basic ${Buffer.from(
        `${process.env.GITHUB_API_AUTH_ID}:${process.env.GITHUB_API_AUTH_PW}`,
    ).toString("base64")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
}

async function getGithubCommits(http: HttpService, githubRepo: string): Promise<number> {
    const res = await http
        .get(`https://api.github.com/repos/${githubRepo}/commits`, { headers })
        .toPromise()

    const items_per_page: number = res.data.length
    const { last } = parse(res.headers.link)

    const res_last = await http.get(last.url, { headers }).toPromise()
    const items_last: number = res_last.data.length

    return items_per_page * (parseInt(last.page, 10) - 1) + items_last
}

async function getGithubStars(http: HttpService, githubRepo: string): Promise<number> {
    const res = await http
        .get(`https://api.github.com/search/repositories?q=repo:${githubRepo}`, { headers })
        .toPromise()
    return res.data.items[0].stargazers_count
}

@Injectable()
export class GithubJob implements Job {
    constructor(
        private http: HttpService,
        @InjectRepository(ProjectEntity) private repository: Repository<ProjectEntity>,
    ) {}

    async run() {
        const projects = await this.repository.find()

        return from(projects)
            .pipe(
                concatMap(project =>
                    forkJoin([
                        getGithubCommits(this.http, project.githubRepo),
                        getGithubStars(this.http, project.githubRepo),
                    ]).pipe(
                        map(([commits, stars]) => ({
                            project,
                            data: {
                                commits,
                                stars,
                            },
                        })),
                        catchError(error => {
                            console.log(
                                `Failed to retrieve Github stats for project: ${project.name}`,
                            )
                            console.log(error)
                            return EMPTY
                        }),
                    ),
                ),
                concatMap(({ project, data }) =>
                    from(this.repository.update(project.id, data)).pipe(
                        catchError(error => {
                            console.log(`Failed to update project: ${project.name}`)
                            console.log(error)
                            return EMPTY
                        }),
                    ),
                ),
            )
            .toPromise()
    }
}
