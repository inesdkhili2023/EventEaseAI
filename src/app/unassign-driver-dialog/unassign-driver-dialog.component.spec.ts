import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignDriverDialogComponent } from './unassign-driver-dialog.component';

describe('UnassignDriverDialogComponent', () => {
  let component: UnassignDriverDialogComponent;
  let fixture: ComponentFixture<UnassignDriverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnassignDriverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignDriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
