import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pt-featured',
  template: `
    <p>
      featured works!
    </p>
  `,
  styleUrls: ['./featured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
