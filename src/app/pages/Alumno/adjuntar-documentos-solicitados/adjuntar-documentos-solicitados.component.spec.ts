import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarDocumentosSolicitadosComponent } from './adjuntar-documentos-solicitados.component';

describe('AdjuntarDocumentosSolicitadosComponent', () => {
  let component: AdjuntarDocumentosSolicitadosComponent;
  let fixture: ComponentFixture<AdjuntarDocumentosSolicitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarDocumentosSolicitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarDocumentosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
