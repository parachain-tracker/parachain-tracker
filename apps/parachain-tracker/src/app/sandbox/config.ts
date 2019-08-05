import { ProjectTile, ProjectTileComponent } from "@parachain-tracker/components"
import { Routes } from "@angular/router"

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
                title: "",
                users: 2340,
            },
        },
    },
]
