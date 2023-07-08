import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  AuthStatus = signal<boolean>(false);
  userEmail!: string;

  constructor(private authService: AuthService) {
    this.AuthStatus = this.authService.isAuthenticate;
  }

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user') ?? 'error').email;
  }


  logout() {
    this.authService.logout();
  }

}
