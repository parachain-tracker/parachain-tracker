import { Component, OnInit } from "@angular/core"

@Component({
    selector: "pt-layout",
    styleUrls: ["./layout.component.scss"],
    template: `
        <nav>
            <h1>ParachainTracker</h1>
            <div class="submit-project">
                <h3>SUBMIT A PROJECT</h3>
            </div>
            <div class="social">
                <i class="reddit"></i>
                <i class="twitter"></i>
                <i class="medium"></i>
            </div>
        </nav>
        <div style="height: 56px"></div>
        <ng-content></ng-content>
        <footer></footer>
    `,
})
export class LayoutComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
