import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "pt-top-items",
    template: `
        <section class="top-items">
            <div class="title">
                <div class="items-title">
                    <div class="top-parachains-svg"></div>
                    <h3 class="items-txt">Top Parachains</h3>
                </div>
                <div class="view-all">
                    <div class="view-all-svg"></div>
                    <div>
                        <h3>view all</h3>
                    </div>
                </div>
            </div>

            <pt-slider class="items-slider">
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 1 }"> </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 2 }"> </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 3 }"> </pt-project-tile>
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
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 1 }"> </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 2 }"> </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{ rank: 3 }"> </pt-project-tile>
                </pt-slide>
            </pt-slider>
        </section>
    `,
    styleUrls: ["./top-items.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopItemsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
