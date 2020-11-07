import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturarConvocatoriaComponent } from './aperturar-convocatoria.component';

describe('AperturarConvocatoriaComponent', () => {
  let component: AperturarConvocatoriaComponent;
  let fixture: ComponentFixture<AperturarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
