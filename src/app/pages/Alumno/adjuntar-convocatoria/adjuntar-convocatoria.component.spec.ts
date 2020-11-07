import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarConvocatoriaComponent } from './adjuntar-convocatoria.component';

describe('AdjuntarConvocatoriaComponent', () => {
  let component: AdjuntarConvocatoriaComponent;
  let fixture: ComponentFixture<AdjuntarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
