import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core"
import * as Flickity from "flickity"

@Component({
    selector: "pt-slider",
    template: `
        <ng-content select="pt-slide"></ng-content>
    `,
    styleUrls: ["./slider.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "flickity-slider",
    },
})
export class SliderComponent implements AfterViewInit {
    private slider: Flickity

    constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit() {
        this.slider = new Flickity(this.elementRef.nativeElement, {
            cellAlign: "left",
            contain: true,
            freeScroll: true,
            groupCells: true,
            pageDots: false,
        })
    }
}
