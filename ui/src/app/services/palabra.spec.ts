import { TestBed } from '@angular/core/testing';

import { Palabra } from './palabra';

describe('Palabra', () => {
  let service: Palabra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Palabra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
