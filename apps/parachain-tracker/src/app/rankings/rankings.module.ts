import { Injectable, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RankingsComponent } from "./rankings.component"
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot } from "@angular/router"
import { CdkTableModule } from "@angular/cdk/table"
import { ApiService } from "../api/api.service"
import { PillModule, TickerModule } from "@parachain-tracker/components"
import { forkJoin, Observable } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { ProjectType } from "@parachain-tracker/api-interfaces"

@Injectable()
export class ProjectRankingsResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const type = (route.paramMap.get("type") as unknown) as ProjectType

        return this.api.getProjectRankings({ type }).pipe(
            map(projects =>
                projects.map(({ id, name, tagline, category, status }, rank) => ({
                    id,
                    name,
                    category,
                    tagline,
                    iconSrc: `/assets/project/${id}/logo64@2x.png`,
                    rank,
                    status,
                })),
            ),
            switchMap(projects =>
                forkJoin(
                    projects.map(project =>
                        this.api
                            .getTickers(project.id)
                            .pipe(map(tickers => ({ project, ticker: tickers.items[0].coords }))),
                    ),
                ),
            ),
        )
    }
}

@NgModule({
    declarations: [RankingsComponent],
    imports: [
        CommonModule,
        CdkTableModule,
        RouterModule.forChild([
            {
                path: ":type",
                component: RankingsComponent,
                resolve: {
                    rankings: ProjectRankingsResolver,
                },
            },
        ]),
        TickerModule,
        PillModule,
    ],
    providers: [ProjectRankingsResolver],
})
export class RankingsModule {}
