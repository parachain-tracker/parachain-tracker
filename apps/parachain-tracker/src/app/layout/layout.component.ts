import { Component, OnInit } from "@angular/core"

@Component({
    selector: "pt-layout",
    styleUrls: ["./layout.component.scss"],
    template: `
        <div class="disclaimer">
            <p>
                ParachainTracker is in technical preview. Data presented on this website is for demo
                purposes only. Please check again once the Polkadot and Kusama networks go live.
                <a href="#">Click here for more information.</a>
            </p>
        </div>
        <nav>
            <div class="nav-frame">
                <a class="heading" routerLink="/">
                    <svg
                        class="logo"
                        viewBox="0 0 66 66"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M37.0196 58.9411C49.0183 58.9411 58.7451 49.2143 58.7451 37.2156C58.7451 25.2169 49.0183 15.4901 37.0196 15.4901C25.021 15.4901 15.2941 25.2169 15.2941 37.2156C15.2941 49.2143 25.021 58.9411 37.0196 58.9411Z"
                            fill="#E6007A"
                            stroke="#F7F3F7"
                            stroke-width="2.24877"
                            stroke-miterlimit="10"
                        />
                        <path
                            d="M27.8039 49.7255C39.8026 49.7255 49.5294 39.9987 49.5294 28C49.5294 16.0014 39.8026 6.27454 27.8039 6.27454C15.8053 6.27454 6.07843 16.0014 6.07843 28C6.07843 39.9987 15.8053 49.7255 27.8039 49.7255Z"
                            fill="#2D2F33"
                        />
                        <path
                            d="M25.8628 19.4706C26.902 19.4706 27.8628 19.7255 28.7059 20.1765C27.6863 18.2157 25.6275 16.8628 23.2549 16.8628C19.8628 16.8628 17.0981 19.6275 17.0981 23.0197C17.0981 25.3922 18.4314 27.451 20.4118 28.4706C19.9608 27.6079 19.7059 26.6471 19.7059 25.6275C19.7059 22.2353 22.451 19.4706 25.8628 19.4706Z"
                            fill="#D3B9C3"
                        />
                        <path
                            d="M29.4118 23.0196C29.4118 21.9804 29.1568 21.0196 28.7059 20.1765C27.8431 19.7255 26.8823 19.4706 25.8627 19.4706C22.4706 19.4706 19.7059 22.2353 19.7059 25.6274C19.7059 26.6667 19.9608 27.6274 20.4117 28.4706C21.2745 28.9216 22.2353 29.1765 23.2549 29.1765C26.647 29.1765 29.4118 26.4314 29.4118 23.0196Z"
                            fill="white"
                        />
                        <path
                            d="M1 55.1372L10.451 64.6078"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M1 37.0393L4.49019 40.5099"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M61.3138 61.1177L64.804 64.6079"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M61.3138 1L64.804 4.4902"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M1.19604 1L4.68624 4.4902"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M7.47058 43.4902L28.9608 65"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M43.4902 1.09802L54.7451 12.3529"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M43.4902 35.3333L65 56.843"
                            stroke="#2D2F33"
                            stroke-width="1.14143"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                    </svg>

                    <h1>ParachainTracker</h1>
                </a>
                <div class="social">
                    <a href="#"><i class="reddit"></i></a>
                    <a href="#"><i class="twitter"></i></a>
                    <a href="#"><i class="medium"></i></a>
                </div>
                <a href="https://hyungsukkang.typeform.com/to/lOEWyp" class="submit-project">
                    <span>SUBMIT A PROJECT</span>
                </a>
            </div>
        </nav>
        <div class="content">
            <ng-content></ng-content>
        </div>
        <footer></footer>
    `,
})
export class LayoutComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
