import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStep3Component } from './buy-step3.component';

describe('BuyStep3Component', () => {
  let component: BuyStep3Component;
  let fixture: ComponentFixture<BuyStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
