import {
  ChangeDetectionStrategy,
  inject,
  AfterViewInit,
  OnInit,
  Component,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerService } from 'app/core/services/customer.service';
import { CustomerDTO } from 'app/core/models/customerDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDialogComponent } from 'app/features/dialogs/order-dialog/order-dialog.component';
import { CreateOrderComponent } from 'app/features/dialogs/create-order/create-order.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  displayedColumns: string[] = [
    'customerName',
    'lastOrderDate',
    'nextPredictedOrder',
    'actions',
  ];
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<CustomerDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading customers', error);
        this.loading = false;
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(customerId: number) {
    const customer = this.dataSource.data.find((c) => c.custid === customerId);

    if (customer) {
      const dialogRef = this.dialog.open(OrderDialogComponent, {
        width: '90vw',
        maxWidth: '90vw',
        data: customer,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  createOrder(customerId: number) {
    const customer = this.dataSource.data.find((c) => c.custid === customerId);
    console.log(customer);
    if (customer) {
      const dialogRef = this.dialog.open(CreateOrderComponent, {
        width: '70vw',
        maxWidth: '70vw',
        data: customer,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
}
