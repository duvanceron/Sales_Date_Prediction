import { Component } from '@angular/core';
import { CustomersListComponent } from "./features/customers/customers-list/customers-list.component";
import { MenuComponent } from "./shared/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CustomersListComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales_Date_Prediction';
}
