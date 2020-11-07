import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPlanComponent } from './registro-plan.component';

describe('RegistroPlanComponent', () => {
  let component: RegistroPlanComponent;
  let fixture: ComponentFixture<RegistroPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
