import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Paginated, ProjectDto, TickerDto } from "@parachain-tracker/api-interfaces"
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

    public getFeaturedProjects(): Observable<ProjectDto[]> {
        return this.http.get<ProjectDto[]>(`/api/project`)
    }

    public getProjectRankings(): Observable<ProjectDto[]> {
        return this.http.get<ProjectDto[]>(`/api/project`)
    }
}
