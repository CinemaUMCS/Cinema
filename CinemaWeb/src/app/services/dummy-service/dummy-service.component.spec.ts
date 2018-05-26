import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyServiceComponent } from './dummy-service.component';

describe('DummyServiceComponent', () => {
  let component: DummyServiceComponent;
  let fixture: ComponentFixture<DummyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
