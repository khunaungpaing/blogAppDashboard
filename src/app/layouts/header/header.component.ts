import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  AuthStatus = signal<boolean>(false);
  userEmail = signal<string>('');

  constructor(private authService: AuthService) {
    this.AuthStatus = this.authService.isAuthenticate;
    this.userEmail = this.authService.userdata;
  }

  ngOnInit(): void {

  }


  logout() {
    this.authService.logout();
  }

}
