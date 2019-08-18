import { HttpService, Injectable } from "@nestjs/common"
import { getRepository } from "typeorm"
import { ProjectEntity } from "../database/entity/project.entity"
import { Job } from "./jobs.module"
const parse = require("parse-link-header")

@Injectable()
export class GithubJob implements Job {
    httpService = new HttpService()

    constructor() {}

    async run() {
        const projectsRepo = getRepository(ProjectEntity)
        const projects = await projectsRepo.find({ relations: ["externalLinks"] })
        const headers = {
            Authorization: `Basic ${Buffer.from(
                `${process.env.GITHUB_API_AUTH_ID}:${process.env.GITHUB_API_AUTH_PW}`,
            ).toString("base64")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        for (let i = 0; i < projects.length; i++) {
            let github_repo = projects[i].externalLinks.find(link =>
                link.url.includes("github.com"),
            )
            if (github_repo) {
                github_repo = github_repo.url.slice(github_repo.url.indexOf("github.com") + 11)
                setTimeout(async () => {
                    try {
                        let res = await this.httpService
                            .get(`https://api.github.com/repos/${github_repo}/commits`, { headers })
                            .toPromise()
                        const items_per_page = res.data.length
                        const { last } = parse(res.headers.link)

                        const res_last = await await this.httpService
                            .get(last.url, { headers })
                            .toPromise()
                        const items_last = res_last.data.length

                        const commits = items_per_page * (parseInt(last.page) - 1) + items_last

                        res = await await this.httpService
                            .get(
                                `https://api.github.com/search/repositories?q=repo:${github_repo}`,
                                { headers },
                            )
                            .toPromise()
                        const stargazers = res.data.items[0].stargazers_count

                        await projectsRepo.update(projects[i].id, {
                            commits: commits,
                            stars: stargazers,
                        })
                        console.log(
                            `Successfully updated commits and stars for PROJECT: ${
                                projects[i].name
                            } - commits: ${commits} - stars: ${stargazers}`,
                        )
                    } catch (e) {
                        console.log(
                            `Failed to update commits and stars for PROJECT: ${
                                projects[i].name
                            } - error: ${e}`,
                        )
                    }
                }, i * 18100)
            } else {
                console.log(`No github repo found for PROJECT ${projects[i].name}`)
            }
        }
    }
}
