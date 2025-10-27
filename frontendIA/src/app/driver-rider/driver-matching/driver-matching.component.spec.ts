import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMatchingComponent } from './driver-matching.component';

describe('DriverMatchingComponent', () => {
  let component: DriverMatchingComponent;
  let fixture: ComponentFixture<DriverMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverMatchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
