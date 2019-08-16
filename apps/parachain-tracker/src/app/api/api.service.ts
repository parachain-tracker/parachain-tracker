import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import {
    Paginated,
    ProjectDto,
    RankingSearchDto,
    TickerDto,
} from "@parachain-tracker/api-interfaces"
import { Observable } from "rxjs"

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    public getProject(id: number | string) {
        return this.http.get<ProjectDto>(`/api/project/${id}`)
    }

    public getTickers(projectId: number | string) {
        const params = new HttpParams({
            fromObject: {
                project_id: projectId.toString(),
            },
        })
        return this.http.get<Paginated<TickerDto>>(`/api/ticker`, {
            params,
        })
    }

    public getFeaturedProjects(query?: { limit: number }): Observable<ProjectDto[]> {
        let params = new HttpParams()
        if (query && query.limit) {
            params = params.set("limit", query.limit.toString())
        }
        return this.http.get<ProjectDto[]>(`/api/featured`, { params })
    }

    public getProjectRankings(query: RankingSearchDto): Observable<ProjectDto[]> {
        const params = new HttpParams()
            .set("limit", query.limit.toString())
            .set("type", query.type.toString())

        return this.http.get<ProjectDto[]>(`/api/ranking`, {
            params,
        })
    }
}
