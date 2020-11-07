import { TestBed } from '@angular/core/testing';

import { SolicitarDocumentosService } from './solicitar-documentos.service';

describe('SolicitarDocumentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitarDocumentosService = TestBed.get(SolicitarDocumentosService);
    expect(service).toBeTruthy();
  });
});
