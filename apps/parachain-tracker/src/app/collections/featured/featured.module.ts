import { Injectable, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FeaturedComponent } from "./featured.component"
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot } from "@angular/router"
import { ProjectTile, ProjectTileModule } from "@parachain-tracker/components"
import { ApiService } from "../../api/api.service"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable()
export class FeaturedProjectsResolver implements Resolve<ProjectTile[]> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectTile[]> {
        return this.api.getFeaturedProjects().pipe(
            map(projects =>
                projects.map(({ id, name, tagline, category }) => ({
                    id,
                    name,
                    tagline,
                    iconSrc: `/assets/project/${id}/logo64@2x.png`,
                    category: category.name,
                })),
            ),
        )
    }
}

@NgModule({
    declarations: [FeaturedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: FeaturedComponent,
                resolve: {
                    projects: FeaturedProjectsResolver,
                },
            },
        ]),
        ProjectTileModule,
    ],
    providers: [FeaturedProjectsResolver],
})
export class FeaturedModule {}
