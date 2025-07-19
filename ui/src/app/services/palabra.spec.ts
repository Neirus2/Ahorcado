import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { PalabraService } from './palabra';

describe('PalabraService', () => {
  let service: PalabraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(PalabraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
