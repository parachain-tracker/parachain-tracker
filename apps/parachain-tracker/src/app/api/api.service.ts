import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { ProjectDto } from "@parachain-tracker/api-interfaces"

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getProject(id: number | string) {
        return this.http.get<ProjectDto>(`/api/project/${id}`)
    }
}
