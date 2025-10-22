import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceDialogComponent } from './distance-dialog.component';

describe('DistanceDialogComponent', () => {
  let component: DistanceDialogComponent;
  let fixture: ComponentFixture<DistanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
