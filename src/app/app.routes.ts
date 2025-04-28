import { Routes } from '@angular/router';
import { BarChartComponent } from './features/bar-chart/bar-chart.component';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';

export const routes: Routes = [
    {path: '',component: CustomersListComponent},
    {path: 'Barchart',component: BarChartComponent},

];
