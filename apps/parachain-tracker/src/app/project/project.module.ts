import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProjectComponent } from "./project.component"
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterModule,
    RouterStateSnapshot,
    Routes,
} from "@angular/router"
import { Observable } from "rxjs"
import { ApiService } from "../api/api.service"
import { TickerModule } from "@parachain-tracker/components"

export class ProjectResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> | Promise<any> | any {
        return this.api.getProject(route.paramMap.get("id"))
    }
}

const routes: Routes = [
    {
        path: "",
        component: ProjectComponent,
        resolve: {
            project: ProjectResolver,
        },
    },
]

@NgModule({
    declarations: [ProjectComponent],
    imports: [CommonModule, RouterModule.forChild(routes), TickerModule],
    providers: [ProjectResolver],
})
export class ProjectModule {}
