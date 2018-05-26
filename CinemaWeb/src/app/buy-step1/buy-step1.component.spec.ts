import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStep1Component } from './buy-step1.component';

describe('BuyStep1Component', () => {
  let component: BuyStep1Component;
  let fixture: ComponentFixture<BuyStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
