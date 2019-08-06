import {
    ProjectTile,
    ProjectTileComponent,
    ProjectTileModule,
    SliderModule,
} from "@parachain-tracker/components"
import { Routes } from "@angular/router"
import { Type } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HostComponent } from "./host.component"

export const modules: Type<any>[] = [ProjectTileModule, SliderModule]

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
                users: 2340,
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
]
