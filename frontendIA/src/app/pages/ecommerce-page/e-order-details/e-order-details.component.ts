import { Component } from '@angular/core';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { BillingInformationComponent } from './billing-information/billing-information.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ItemsFromOrderComponent } from './items-from-order/items-from-order.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-e-order-details',
    standalone: true,
    imports: [MatCardModule, ItemsFromOrderComponent, OrderSummaryComponent, ShippingInformationComponent, BillingInformationComponent, DeliveryInfoComponent],
    templateUrl: './e-order-details.component.html',
    styleUrl: './e-order-details.component.scss'
})
export class EOrderDetailsComponent {}