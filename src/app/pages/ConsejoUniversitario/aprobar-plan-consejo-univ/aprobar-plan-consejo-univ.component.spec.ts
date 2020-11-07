import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarPlanConsejoUnivComponent } from './aprobar-plan-consejo-univ.component';

describe('AprobarPlanConsejoUnivComponent', () => {
  let component: AprobarPlanConsejoUnivComponent;
  let fixture: ComponentFixture<AprobarPlanConsejoUnivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarPlanConsejoUnivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarPlanConsejoUnivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
