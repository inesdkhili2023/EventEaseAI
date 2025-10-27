import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverDialogComponent } from './assign-driver-dialog.component';

describe('AssignDriverDialogComponent', () => {
  let component: AssignDriverDialogComponent;
  let fixture: ComponentFixture<AssignDriverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDriverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
