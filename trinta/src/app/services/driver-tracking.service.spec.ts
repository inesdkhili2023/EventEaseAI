import { TestBed } from '@angular/core/testing';

import { DriverTrackingService } from './driver-tracking.service';

describe('DriverTrackingService', () => {
  let service: DriverTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
