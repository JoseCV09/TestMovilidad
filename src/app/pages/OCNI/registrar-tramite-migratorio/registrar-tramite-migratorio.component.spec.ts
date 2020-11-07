import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTramiteMigratorioComponent } from './registrar-tramite-migratorio.component';

describe('RegistrarTramiteMigratorioComponent', () => {
  let component: RegistrarTramiteMigratorioComponent;
  let fixture: ComponentFixture<RegistrarTramiteMigratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarTramiteMigratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTramiteMigratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
