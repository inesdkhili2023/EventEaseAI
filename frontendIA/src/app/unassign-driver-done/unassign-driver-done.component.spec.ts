import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignDriverDoneComponent } from './unassign-driver-done.component';

describe('UnassignDriverDoneComponent', () => {
  let component: UnassignDriverDoneComponent;
  let fixture: ComponentFixture<UnassignDriverDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnassignDriverDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignDriverDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
