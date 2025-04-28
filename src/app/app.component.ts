import { Component } from '@angular/core';
import { MenuComponent } from "./shared/menu/menu.component";
import { RouterOutlet } from '@angular/router'; //  Import router
import { RouterModule } from '@angular/router';  // Import RouterModule for routing

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  MenuComponent,RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales_Date_Prediction';
}
