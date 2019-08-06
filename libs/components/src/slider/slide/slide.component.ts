import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: "pt-slide",
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ["./slide.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {}
