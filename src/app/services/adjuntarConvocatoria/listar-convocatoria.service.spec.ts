import { TestBed } from '@angular/core/testing';

import { ListarConvocatoriaService } from './listar-convocatoria.service';

describe('ListarConvocatoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarConvocatoriaService = TestBed.get(ListarConvocatoriaService);
    expect(service).toBeTruthy();
  });
});
