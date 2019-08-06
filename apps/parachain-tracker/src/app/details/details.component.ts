import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "pt-details",
    template: `
        <div class="frame">
            <div class="banner" [style.background-image]="'url(/assets/projects/2/banner.jpg)'">
                <div class="pill" *ngFor="let tile of tiles">
                    <div class="pill-icon"></div>
                    <div class="pill-label">Finance</div>
                </div>
            </div>

            <div class="header">
                <p class="developer">
                    Esteban Ordano / Dario Sneidermanis / Manuel Aráoz / Yemel Jardi
                </p>
                <div class="logo-frame">
                    <img class="header-logo" src="/assets/projects/2/logo64@2x.png" alt="" />
                </div>
                <h1 class="name">Crypto Space Commanders</h1>
                <p class="tagline">A virtual world that runs on open standards.</p>
                <a href="#" class="web-url">
                    <i class="web-url-icon fa fa-chevron-circle-right"></i>
                    <span class="web-url-label">Go to website</span>
                </a>
            </div>

            <div class="detail">
                <div class="social">
                    <a class="social-link" href="#" target="_blank">
                        <i class="social-icon fa fa-comments"></i>
                    </a>
                    <a class="social-link" href="#" target="_blank">
                        <i class="social-icon fab fa-reddit"></i>
                    </a>
                    <a class="social-link" href="#" target="_blank">
                        <i class="social-icon fab fa-twitter"></i>
                    </a>
                    <a class="social-link" href="#" target="_blank">
                        <i class="social-icon fab fa-medium-m"></i>
                    </a>
                </div>

                <div class="description">
                    <h2 class="section-heading">About</h2>

                    <p>
                        Decentraland is a virtual reality platform powered by the Ethereum
                        blockchain. Users can create, experience, and monetize content and
                        applications
                    </p>

                    <p>
                        Introducing the Decentraland SDK Alpha. The tools and support you need to
                        pioneer Genesis City.
                    </p>
                </div>

                <div class="stats">
                    <h2 class="section-heading">Trends</h2>

                    <div class="stats-grid">
                        <div class="stats-tile" *ngFor="let tile of tiles">
                            <span class="stats-tile-title">Active Users</span>
                            <div class="stats-tile-ticker"></div>

                            <div class="stats-tile-data">
                                <div class="stats-tile-key">Daily</div>
                                <div class="stats-tile-value">102</div>

                                <div class="stats-tile-key">Weekly</div>
                                <div class="stats-tile-value">724</div>

                                <div class="stats-tile-key">Monthly</div>
                                <div class="stats-tile-value">5,634</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./details.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
    public tiles = [1, 2, 3]

    constructor() {}

    ngOnInit() {}
}
