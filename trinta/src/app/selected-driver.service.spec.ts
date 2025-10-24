import { TestBed } from '@angular/core/testing';

import { SelectedDriverService } from './services/selected-driver.service';

describe('SelectedDriverService', () => {
  let service: SelectedDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
