import { TestBed } from '@angular/core/testing';

import { AdministrarVacantesService } from './administrar-vacantes.service';

describe('AdministrarVacantesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministrarVacantesService = TestBed.get(AdministrarVacantesService);
    expect(service).toBeTruthy();
  });
});
