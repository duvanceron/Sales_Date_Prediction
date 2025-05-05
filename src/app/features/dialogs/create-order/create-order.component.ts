import { OnInit, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OrderService } from 'app/core/services/order.service';
import { ShipperService } from 'app/core/services/shipper.service';
import { ProductService } from 'app/core/services/product.service';
import { EmployeeService } from 'app/core/services/employee.service';
import { FormErrorService } from 'app/core/services/form-error.service';
import { orderWithDetailDTO } from 'app/core/models/orderWithDetailDTO';
import { CustomerDTO } from 'app/core/models/customerDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  customer: CustomerDTO;
  employees: any[] = [];
  shippers: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private shipperService: ShipperService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private formErrorService: FormErrorService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDTO
  ) {
    this.customer = data;
    this.orderForm = this.fb.group({
      empid: ['', Validators.required],
      shipperid: ['', Validators.required],
      shipname: ['', Validators.required],
      shipaddress: ['', Validators.required],
      shipcity: ['', Validators.required],
      orderdate: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9]{1,2})/([0-9]{1,2})/\\d{4}$'),
        ],
      ],
      requireddate: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/d{4}$'),
        ],
      ],
      shippeddate: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/d{4}$'),
        ],
      ],
      freight: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')],
      ],
      shipcountry: ['', Validators.required],
      productid: ['', Validators.required],
      unitprice: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')],
      ],
      qty: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')],
      ],
      discount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')],
      ],
    });
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadShippers();
    this.loadEmployees();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order: orderWithDetailDTO = this.orderForm.value;

      this.orderService.createOrder(order).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage(response.message);
          }
        },
        error: (error) => {
          this.showMessage(error.message);
        },
      });
    } else {
      this.showMessage(
        'Datos invalidos! Por favor revisar los datos ingresados'
      );
    }
  }
  loadShippers() {
    this.shipperService.getShippers().subscribe(
      (data) => {
        this.shippers = data;
      },
      (error) => {
        console.error('Error loading shippers', error);
      }
    );
  }
  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees', error);
      }
    );
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'bottom', // Optional: position of snack bar
      horizontalPosition: 'right', // Optional: position of snack bar
      panelClass: ['error-snackbar'], // Optional: custom styling
    });
  }

  verifyData(field: string) {
    return this.formErrorService.getErrorMessage(
      this.orderForm.get(field),
      field
    );
  }
}
