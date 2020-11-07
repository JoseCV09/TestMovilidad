import { TestBed } from '@angular/core/testing';

import { AperturarConvocatoriaService } from './aperturar-convocatoria.service';

describe('AperturarConvocatoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AperturarConvocatoriaService = TestBed.get(AperturarConvocatoriaService);
    expect(service).toBeTruthy();
  });
});
