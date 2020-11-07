import { TestBed } from '@angular/core/testing';

import { AdjuntarSolicitadosService } from './adjuntar-solicitados.service';

describe('AdjuntarSolicitadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdjuntarSolicitadosService = TestBed.get(AdjuntarSolicitadosService);
    expect(service).toBeTruthy();
  });
});
