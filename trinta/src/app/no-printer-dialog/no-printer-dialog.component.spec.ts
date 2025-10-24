import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPrinterDialogComponent } from './no-printer-dialog.component';

describe('NoPrinterDialogComponent', () => {
  let component: NoPrinterDialogComponent;
  let fixture: ComponentFixture<NoPrinterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPrinterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPrinterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
