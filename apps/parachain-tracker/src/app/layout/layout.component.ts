import { Component, OnInit } from "@angular/core"

@Component({
    selector: "pt-layout",
    styleUrls: ["./layout.component.scss"],
    template: `
        <nav>
            <a class="heading" routerLink="/">
                <h1>ParachainTracker</h1>
            </a>
            <a href="https://hyungsukkang.typeform.com/to/lOEWyp" class="submit-project">
                <h3>SUBMIT A PROJECT</h3>
            </a>
            <div class="social">
                <a href="#"><i class="reddit"></i></a>
                <a href="#"><i class="twitter"></i></a>
                <a href="#"><i class="medium"></i></a>
            </div>
        </nav>
        <div class="content">
            <ng-content></ng-content>
        </div>
        <div></div>
        <footer></footer>
    `,
})
export class LayoutComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
