import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { adminGuard } from './guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { AdminManageProjectComponent } from './components/admin-manage-project/admin-manage-project.component';
import { allProjectsResolver } from './resolvers/all-projects.resolver';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard',component:DashboardComponent,canActivate: [adminGuard],
    children: [
      { path: 'admin/projects',component: AdminProjectsComponent, data : {fetchAllProjectsPartial:true}, resolve : {allProjects :allProjectsResolver }},
      { path: 'admin/manageproject',component: AdminManageProjectComponent}
    ],
  },
  { path: '**', component: NotfoundComponent },
];
