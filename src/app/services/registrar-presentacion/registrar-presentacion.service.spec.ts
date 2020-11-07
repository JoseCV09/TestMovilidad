import { TestBed } from '@angular/core/testing';

import { RegistrarPresentacionService } from './registrar-presentacion.service';

describe('RegistrarPresentacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarPresentacionService = TestBed.get(RegistrarPresentacionService);
    expect(service).toBeTruthy();
  });
});
