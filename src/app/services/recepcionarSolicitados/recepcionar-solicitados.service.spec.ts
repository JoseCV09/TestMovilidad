import { TestBed } from '@angular/core/testing';

import { RecepcionarSolicitadosService } from './recepcionar-solicitados.service';

describe('RecepcionarSolicitadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepcionarSolicitadosService = TestBed.get(RecepcionarSolicitadosService);
    expect(service).toBeTruthy();
  });
});
