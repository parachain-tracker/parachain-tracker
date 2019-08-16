import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    PLATFORM_ID,
} from "@angular/core"
import * as Flickity from "flickity"
import { isPlatformBrowser } from "@angular/common"

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

    constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: object) {}

    public ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.slider = new Flickity(this.elementRef.nativeElement, {
                cellAlign: "left",
                contain: true,
                freeScroll: true,
                groupCells: true,
                pageDots: false,
            })
        }
    }
}
