import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "pt-featured",
    template: `
        <section class="featured">
            <div class="title">
                <div class="featured-title">
                    <div class="featured-svg"></div>
                    <h3 class="featured-txt">Featured</h3>
                </div>
                <div class="view-all">
                    <div class="view-all-svg"></div>
                    <div>
                        <h3>view all</h3>
                    </div>
                </div>
            </div>
            
            
            <pt-slider class="featured-slider">
                <pt-slide>
                    <pt-project-tile [feature]="{rank: 1 }">
                    </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{rank: 2 }">
                    </pt-project-tile>
                </pt-slide>
                <pt-slide>
                    <pt-project-tile [feature]="{rank: 3 }">
                    </pt-project-tile>
                </pt-slide>
            </pt-slider>
        </section>
    `,
    styleUrls: ["./featured.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
