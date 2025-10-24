import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStatusDialogComponent } from './kitchen-status-dialog.component';

describe('KitchenStatusDialogComponent', () => {
  let component: KitchenStatusDialogComponent;
  let fixture: ComponentFixture<KitchenStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
