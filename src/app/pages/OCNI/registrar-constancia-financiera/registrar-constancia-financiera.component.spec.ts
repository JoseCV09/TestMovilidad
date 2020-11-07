import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConstanciaFinancieraComponent } from './registrar-constancia-financiera.component';

describe('RegistrarConstanciaFinancieraComponent', () => {
  let component: RegistrarConstanciaFinancieraComponent;
  let fixture: ComponentFixture<RegistrarConstanciaFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarConstanciaFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarConstanciaFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
