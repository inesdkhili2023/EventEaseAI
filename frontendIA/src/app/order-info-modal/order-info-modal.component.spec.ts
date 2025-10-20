import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoModalComponent } from './order-info-modal.component';

describe('OrderInfoModalComponent', () => {
  let component: OrderInfoModalComponent;
  let fixture: ComponentFixture<OrderInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
