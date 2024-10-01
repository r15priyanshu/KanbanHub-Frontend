import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'KanbanHub';

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    console.log("Inside ngOnInit of AppComponent.")
    const token = this.loginService.getToken()
    if(token!=null){
      this.loginService.checkTokenValidity(token).subscribe(next=>{
        console.log("Is Token Valid :",next)
        if(next){
          const tokenValidityInMilliSeconds = this.loginService.getTokenValidityInMilliSeconds()
          const tokenExpiresAt = new Date(Date.now()+tokenValidityInMilliSeconds)
          console.log("Token is Valid : Setting Up Auto Logout At :",tokenExpiresAt)
          this.loginService.performAutoLogout(tokenValidityInMilliSeconds)
        }else{
          console.log("Token Is Not Valid !! Performing Logout !!")
          this.loginService.performLogout();
        }
      })
    }
  }
}
