import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProjectTile } from "@parachain-tracker/components"
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: "pt-top-items",
    template: `
        <section class="top-items">
            <div class="title">
                <div class="items-title">
                    <div class="top-parachains-svg"></div>
                    <h3 class="items-txt">Top Parachains</h3>
                </div>
                <a [routerLink]="['/rankings']" class="view-all">
                    <div class="view-all-svg"></div>
                    <div>
                        <h3>view all</h3>
                    </div>
                </a>
            </div>

            <pt-slider class="items-slider">
                <pt-slide *ngFor="let project of parachains">
                    <a [routerLink]="['project', project.id]">
                        <pt-project-tile [feature]="project"></pt-project-tile>
                    </a>
                </pt-slide>
            </pt-slider>
            <div class="title">
                <div class="items-title">
                    <div class="top-dapps-svg"></div>
                    <h3 class="items-txt">Top Dapps</h3>
                </div>
                <div class="view-all">
                    <div class="view-all-svg"></div>
                    <div>
                        <h3>view all</h3>
                    </div>
                </div>
            </div>

            <pt-slider class="items-slider">
                <pt-slide *ngFor="let project of dapps">
                    <a [routerLink]="['project', project.id]">
                        <pt-project-tile [feature]="project"></pt-project-tile>
                    </a>
                </pt-slide>
            </pt-slider>
        </section>
    `,
    styleUrls: ["./top-items.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopItemsComponent {
    public parachains: ProjectTile[]
    public dapps: ProjectTile[]

    constructor(route: ActivatedRoute) {
        this.parachains = route.snapshot.data.parachains
        this.dapps = route.snapshot.data.dapps
    }
}
