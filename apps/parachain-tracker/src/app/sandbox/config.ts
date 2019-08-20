import {
    ProjectTile,
    ProjectTileComponent,
    ProjectTileModule,
    SliderModule,
    TickerComponent,
    TickerModule,
} from "@parachain-tracker/components"
import { Routes } from "@angular/router"
import { Type } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HostComponent } from "./host.component"

export const modules: Type<any>[] = [ProjectTileModule, SliderModule, TickerModule]

export const components: Routes = [
    {
        path: "project-tile",
        component: ProjectTileComponent,
        data: {
            feature: <ProjectTile>{
                id: 1,
                iconSrc: "/assets/projects/1/logo64@2x.png",
                // category: "Finance",
                name: "WeWork",
                rank: 1,
                tagline: "It just works.",
                stars: 2340,
            },
        },
    },
    {
        path: "slider",
        component: HostComponent,
        data: {
            imports: [CommonModule, SliderModule, ProjectTileModule],
            template: `
                <pt-slider>
                    <pt-slide *ngFor="let feature of features">
                        <pt-project-tile [feature]="feature"></pt-project-tile>
                    </pt-slide>
                </pt-slider>
            `,
            context: {
                features: Array.from({ length: 10 }).map((_, index) => ({
                    id: index,
                    iconSrc: "/assets/projects/1/logo64@2x.png",
                    // category: "Finance",
                    name: "WeWork",
                    rank: index + 1,
                    tagline: "It just works.",
                    users: 2340,
                })),
            },
        },
    },
    {
        path: "ticker",
        component: TickerComponent,
        data: {
            dataSeries: [65, 59, 80, 81, 56, 55, 40],
            xAxisLabels: Array.from({ length: 7 }, (_, index) =>
                new Date(Date.now() + index * 3600 * 24).toISOString(),
            ),
        },
    },
]
