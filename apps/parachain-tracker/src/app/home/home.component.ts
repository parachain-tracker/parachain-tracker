import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "pt-home",
    template: `
        <pt-hero></pt-hero>
        <section></section>
        <pt-featured></pt-featured>
        <section class="ad-mid"></section>
        <pt-top-items></pt-top-items>
    `,
    styleUrls: ["./home.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
