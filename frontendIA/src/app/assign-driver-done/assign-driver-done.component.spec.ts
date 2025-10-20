import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverDoneComponent } from './assign-driver-done.component';

describe('AssignDriverDoneComponent', () => {
  let component: AssignDriverDoneComponent;
  let fixture: ComponentFixture<AssignDriverDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDriverDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDriverDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
