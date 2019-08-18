import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProjectComponent } from "./project.component"
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterModule,
    RouterStateSnapshot,
    Routes,
} from "@angular/router"
import { Observable, throwError } from "rxjs"
import { ApiService } from "../api/api.service"
import { PillModule, TickerModule } from "@parachain-tracker/components"
import { catchError, tap } from "rxjs/operators"

export class ProjectResolver implements Resolve<any> {
    constructor(private api: ApiService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> | Promise<any> | any {
        return this.api.getProject(route.paramMap.get("id")).pipe(
            tap(res => {
                if (!res) {
                    throw new Error("Project not found")
                }
            }),
            catchError(e => {
                // this.router.navigate(["/"])
                return throwError(e)
            }),
        )
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
    imports: [CommonModule, RouterModule.forChild(routes), TickerModule, PillModule],
    providers: [ProjectResolver],
})
export class ProjectModule {}
