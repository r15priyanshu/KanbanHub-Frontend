import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APPLICATION_NAME } from '../../helpers/globalconstants';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EmployeeDto } from '../../dtos/EmployeeDto';
import { PERFORM_MANUAL_LOGOUT } from '../../helpers/custom-confirm-dialog-data';
import { CommonComponentService } from '../../services/common-component.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UpperCasePipe,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public navBarHeadingName:string=APPLICATION_NAME
  public isLoggedIn:boolean=false;
  public employee : EmployeeDto | null = null;

  constructor(
    private loginService:LoginService,
    private commonComponentService:CommonComponentService,
    private router:Router
  ){}

  ngOnInit(): void {
    console.log("Inside ngOnInit of NavbarComponent.")
    this.loginService.isLoggedInSubject.subscribe((value)=>{
      this.employee = this.loginService.getLoggedInEmployeeDetails();
      this.isLoggedIn = value
      console.log("Inside ngOnInit of NavbarComponent: Consuming : isLoggedIn = ",this.isLoggedIn);
    })
  }

  navigateFromDashboard(){
    this.router.navigate(["/dashboard/admin/projects"])
  }

  handleLogout(){
    const matDialogRef = this.commonComponentService.openConfirmDialog(PERFORM_MANUAL_LOGOUT);
    matDialogRef.afterClosed().subscribe((result)=>{
      console.log(PERFORM_MANUAL_LOGOUT.text,result)
      if(result){
        this.loginService.performLogout(true);
      }
    })
  }
}
