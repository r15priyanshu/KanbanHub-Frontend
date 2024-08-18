import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminTabsComponent } from "../../../components/admin-tabs/admin-tabs.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, AdminTabsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
