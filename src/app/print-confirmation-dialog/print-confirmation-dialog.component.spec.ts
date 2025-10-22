import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConfirmationDialogComponent } from './print-confirmation-dialog.component';

describe('PrintConfirmationDialogComponent', () => {
  let component: PrintConfirmationDialogComponent;
  let fixture: ComponentFixture<PrintConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
