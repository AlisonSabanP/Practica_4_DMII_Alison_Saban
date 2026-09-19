import { TestBed } from '@angular/core/testing';

import { Registros } from './registros';

describe('Registros', () => {
  let service: Registros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Registros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
