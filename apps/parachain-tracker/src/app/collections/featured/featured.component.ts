import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core"
import { ProjectTile } from "@parachain-tracker/components"
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: "pt-featured",
    template: `
        <div class="frame">
            <h1 class="heading">Featured</h1>

            <p class="description">Our favorite picks at the moment</p>

            <div class="grid">
                <a
                    class="grid-tile"
                    *ngFor="let project of projects"
                    [routerLink]="['/project', project.id]"
                >
                    <pt-project-tile class="project-tile" [feature]="project"></pt-project-tile>
                </a>
            </div>
        </div>
    `,
    styleUrls: ["./featured.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedComponent {
    public projects: ProjectTile[]

    constructor(route: ActivatedRoute, cdr: ChangeDetectorRef) {
        this.projects = []

        route.data.subscribe(data => {
            this.projects = data.projects
            cdr.markForCheck()
        })
    }
}
