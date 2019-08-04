import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pt-hero',
  template: `      
    <div>
        <div class="hero-text">
            <h1>Explore DApps and Parachains on the Polkadot Network</h1>
            <h2>Discover the Pinnacle of blockchain technology in parachains and possibility with DApps</h2>
            <a href="" class="hero-link">Learn more about DApps</a>
            <br>
            <a href="" class="hero-link">Learn more about Parachains</a>
        </div>
        <div class="hero-svg"></div>
    </div>
    <section></section>
  `,
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
