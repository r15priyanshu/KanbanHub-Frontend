import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { AdminManageProjectComponent } from './components/admin-manage-project/admin-manage-project.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/dashboard',component:AdminDashboardComponent,canActivate: [adminGuard],
    children: [
      { path: 'projects',component: AdminProjectsComponent},
      { path: 'manageproject',component: AdminManageProjectComponent}
    ],
  },
  { path: '**', component: NotfoundComponent },
];
