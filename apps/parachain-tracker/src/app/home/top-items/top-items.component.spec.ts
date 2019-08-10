import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopItemsComponent } from './top-items.component';

describe('TopItemsComponent', () => {
  let component: TopItemsComponent;
  let fixture: ComponentFixture<TopItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
