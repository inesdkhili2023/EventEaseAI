import { TestBed } from '@angular/core/testing';

import { DriverAvailabilityService } from './driver-availability.service';

describe('DriverAvailabilityService', () => {
  let service: DriverAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
