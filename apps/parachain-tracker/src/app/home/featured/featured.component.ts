import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProjectTile } from "@parachain-tracker/components"

@Component({
    selector: "pt-featured",
    template: `
        <section class="featured">
            <div class="title">
                <div class="featured-title">
                    <div class="featured-svg"></div>
                    <h3 class="featured-txt">Featured</h3>
                </div>
                <a [routerLink]="['/collections/featured']" class="view-all">
                    <div class="view-all-svg"></div>
                    <div>
                        <h3>view all</h3>
                    </div>
                </a>
            </div>

            <pt-slider class="featured-slider">
                <pt-slide *ngFor="let project of projects">
                    <a [routerLink]="['project', project.id]">
                        <pt-project-tile [feature]="project"></pt-project-tile>
                    </a>
                </pt-slide>
            </pt-slider>
        </section>
    `,
    styleUrls: ["./featured.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedComponent {
    public projects: ProjectTile[]

    constructor(private route: ActivatedRoute) {
        this.projects = route.snapshot.data.featured
    }
}
