import { TestBed } from '@angular/core/testing';

import { DriverMatchingService } from './driver-matching.service';

describe('DriverMatchingService', () => {
  let service: DriverMatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
