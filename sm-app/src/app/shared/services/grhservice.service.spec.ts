import { TestBed } from '@angular/core/testing';

import { GRHServiceService } from './grhservice.service';

describe('GRHServiceService', () => {
  let service: GRHServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GRHServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
