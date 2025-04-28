import {
  OnInit,
  Component,
  ViewChild,
  Inject,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { OrderService } from 'app/core/services/order.service';
import { orderWithDetailDTO } from 'app/core/models/orderWithDetailDTO';
import { CustomerDTO } from 'app/core/models/customerDTO';
@Component({
  selector: 'app-create-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  customer: CustomerDTO;
  employees: { id: number; name: string }[] = [];
  shippers = ['Shipper GVSUA', 'Shipper ETYNR', 'Shipper ZHISN'];
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDTO
  ) {
    this.customer = data;
    this.employees = [
      { id: this.customer.custid, name: this.customer.customerName },
    ];
    this.orderForm = this.fb.group({
      empid: ['', Validators.required],
      shipperid: ['', Validators.required],
      shipname: ['', Validators.required],
      shipaddress: ['', Validators.required],
      shipcity: ['', Validators.required],
      orderdate: ['', Validators.required],
      requireddate: ['', Validators.required],
      shippeddate: ['', Validators.required],
      freight: ['', Validators.required],
      shipcountry: ['', Validators.required],
      orderid: ['', Validators.required],
      productid: ['', Validators.required],
      unitprice: ['', Validators.required],
      qty: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order: orderWithDetailDTO = this.orderForm.value;
      this.orderService.createOrder(order).subscribe({
        next: (response) => {
          console.log('Created Successfully', response);
        },
        error: (error) => {
          console.error('Error Creating Order', error);
        },
      });
    } else {
      console.error('Form Invalid');
    }
  }
}
