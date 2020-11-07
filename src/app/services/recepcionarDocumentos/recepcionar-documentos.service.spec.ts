import { TestBed } from '@angular/core/testing';

import { RecepcionarDocumentosService } from './recepcionar-documentos.service';

describe('RecepcionarDocumentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepcionarDocumentosService = TestBed.get(RecepcionarDocumentosService);
    expect(service).toBeTruthy();
  });
});
