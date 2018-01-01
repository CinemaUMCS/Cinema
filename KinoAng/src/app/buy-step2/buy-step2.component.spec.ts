import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStep2Component } from './buy-step2.component';

describe('BuyStep2Component', () => {
  let component: BuyStep2Component;
  let fixture: ComponentFixture<BuyStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
