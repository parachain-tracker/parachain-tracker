import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "pt-hero",
    template: `
        <div class="hero-wrapper">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Explore DApps and Parachains <br />on the Polkadot Network</h1>
                    <h2>
                        Discover the Pinnacle of blockchain technology in parachains and
                        possibilities with DApps
                    </h2>
                    <div class="goto-container">
                        <div class="goto"></div>
                        <a href="" class="hero-link">Learn more about DApps</a>
                    </div>
                    <div class="goto-container">
                        <div class="goto"></div>
                        <a href="" class="hero-link">Learn more about Parachains</a>
                    </div>
                    <button class="goto-button"><p>View Dapps & Parachains</p></button>
                </div>
                <div class="hero-svg"></div>
            </div>
        </div>
        <section></section>
    `,
    styleUrls: ["./hero.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
