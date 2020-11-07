import { TestBed } from '@angular/core/testing';

import { RegistrarTramiteMigratorioService } from './registrar-tramite-migratorio.service';

describe('RegistrarTramiteMigratorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarTramiteMigratorioService = TestBed.get(RegistrarTramiteMigratorioService);
    expect(service).toBeTruthy();
  });
});
