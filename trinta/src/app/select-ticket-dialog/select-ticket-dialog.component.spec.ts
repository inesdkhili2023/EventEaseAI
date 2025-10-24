import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTicketDialogComponent } from './select-ticket-dialog.component';

describe('SelectTicketDialogComponent', () => {
  let component: SelectTicketDialogComponent;
  let fixture: ComponentFixture<SelectTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTicketDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
