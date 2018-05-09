import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStep0Component } from './buy-step-0.component';

describe('BuyStep0Component', () => {
  let component: BuyStep0Component;
  let fixture: ComponentFixture<BuyStep0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStep0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
