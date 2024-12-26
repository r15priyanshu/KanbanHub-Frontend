import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'KanbanHub';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    console.log('Inside ngOnInit of AppComponent.');
    const token = this.loginService.getToken()
    if(token){
      const {tokenValidForMilliSeconds} = this.loginService.isTokenValid();
      this.loginService.performAutoLogout(tokenValidForMilliSeconds);
    }
  }
}
