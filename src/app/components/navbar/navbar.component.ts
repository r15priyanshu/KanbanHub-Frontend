import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { APPLICATION_NAME } from '../../helpers/globalconstants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UpperCasePipe,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navBarHeadingName:string=APPLICATION_NAME
}
