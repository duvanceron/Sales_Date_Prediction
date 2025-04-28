import { Component } from '@angular/core';
// import { CustomersListComponent } from "./features/customers/customers-list/customers-list.component";
import { MenuComponent } from "./shared/menu/menu.component";
import { RouterOutlet } from '@angular/router'; //  Import router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  MenuComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales_Date_Prediction';
}
