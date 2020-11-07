import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionarDocumentosSolicitadosComponent } from './recepcionar-documentos-solicitados.component';

describe('RecepcionarDocumentosSolicitadosComponent', () => {
  let component: RecepcionarDocumentosSolicitadosComponent;
  let fixture: ComponentFixture<RecepcionarDocumentosSolicitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionarDocumentosSolicitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionarDocumentosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
