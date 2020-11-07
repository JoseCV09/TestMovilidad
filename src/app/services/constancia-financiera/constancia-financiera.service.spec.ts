import { TestBed } from '@angular/core/testing';

import { ConstanciaFinancieraService } from './constancia-financiera.service';

describe('ConstanciaFinancieraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstanciaFinancieraService = TestBed.get(ConstanciaFinancieraService);
    expect(service).toBeTruthy();
  });
});
