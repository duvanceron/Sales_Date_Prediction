import { OnInit, Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from 'app/core/services/order.service';
import { orderDTO } from 'app/core/models/orderDTO';
import { CustomerDTO } from 'app/core/models/customerDTO';
@Component({
  selector: 'app-order-dialog',
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
})
export class OrderDialogComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  dataSource = new MatTableDataSource<orderDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customer: CustomerDTO;

  displayedColumns: string[] = [
    'orderid',
    'requireddate',
    'shippeddate',
    'shipname',
    'shipaddress',
    'shipcity',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerDTO,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderDialogComponent>
  ) {
     this.customer = data;
  }

  ngOnInit(): void {
    this.orderService.getOrders(this.customer.custid).subscribe(
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
}
