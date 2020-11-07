import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlanAprobadoOcniComponent } from './ver-plan-aprobado-ocni.component';

describe('VerPlanAprobadoOcniComponent', () => {
  let component: VerPlanAprobadoOcniComponent;
  let fixture: ComponentFixture<VerPlanAprobadoOcniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPlanAprobadoOcniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlanAprobadoOcniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
