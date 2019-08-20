import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    PLATFORM_ID,
    Renderer2,
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

    @Input()
    public cellAlign: string

    @HostBinding("class.is-ready")
    public isReady: boolean

    constructor(
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: object,
        private renderer: Renderer2,
    ) {
        this.isReady = false
    }

    public ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const nativeElement = this.elementRef.nativeElement
            this.slider = new Flickity(nativeElement, {
                cellAlign: this.cellAlign || "left",
                contain: true,
                freeScroll: true,
                groupCells: true,
                pageDots: false,
                prevNextButtons: false,
            })

            this.slider.on("dragStart", () => {
                this.renderer.setStyle(nativeElement, "pointer-events", "none")
            })

            this.slider.on("dragEnd", () => {
                this.renderer.removeStyle(nativeElement, "pointer-events")
            })

            this.isReady = true
        }
    }
}
