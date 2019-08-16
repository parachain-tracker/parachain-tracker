import { Injectable, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HomeComponent } from "./home.component"
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot } from "@angular/router"
import { HeroComponent } from "./hero/hero.component"
import { FeaturedComponent } from "./featured/featured.component"
import { ProjectTile, ProjectTileModule, SliderModule } from "@parachain-tracker/components"
import { TopItemsComponent } from "./top-items/top-items.component"
import { ApiService } from "../api/api.service"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ProjectType } from "@parachain-tracker/api-interfaces"

@Injectable()
export class TopParachainsResolver implements Resolve<ProjectTile[]> {
    constructor(private api: ApiService) {}

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<ProjectTile[]> {
        return this.api.getProjectRankings({ limit: 10, type: ProjectType.parachain }).pipe(
            map(projects =>
                projects.map(({ id, name, tagline, stars }, index) => ({
                    id,
                    name,
                    tagline,
                    iconSrc: `/assets/project/${id}/logo64@2x.png`,
                    stars,
                    rank: index + 1,
                })),
            ),
        )
    }
}

@Injectable()
export class TopDappsResolver implements Resolve<ProjectTile[]> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectTile[]> {
        return this.api.getProjectRankings({ limit: 10, type: ProjectType.dapp }).pipe(
            map(projects =>
                projects.map(({ id, name, tagline, stars }, index) => ({
                    id,
                    name,
                    tagline,
                    iconSrc: `/assets/project/${id}/logo64@2x.png`,
                    stars,
                    rank: index + 1,
                })),
            ),
        )
    }
}

@Injectable()
export class FeaturedProjectsResolver implements Resolve<ProjectTile[]> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectTile[]> {
        return this.api.getFeaturedProjects({ limit: 10 }).pipe(
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
    declarations: [HomeComponent, HeroComponent, FeaturedComponent, TopItemsComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: HomeComponent,
                resolve: {
                    parachains: TopParachainsResolver,
                    dapps: TopDappsResolver,
                    featured: FeaturedProjectsResolver,
                },
            },
        ]),
        SliderModule,
        ProjectTileModule,
    ],
    providers: [FeaturedProjectsResolver, TopParachainsResolver, TopDappsResolver],
})
export class HomeModule {}
