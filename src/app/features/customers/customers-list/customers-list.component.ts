import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
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
    HttpClientModule
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements OnInit,AfterViewInit {
  loading: boolean = true;
  displayedColumns: string[] = ['customerName','lastOrderDate', 'nextPredictedOrder','actions'];

  
  dataSource = new MatTableDataSource<CustomerDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService) {
  }
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        console.log(data);
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
}
