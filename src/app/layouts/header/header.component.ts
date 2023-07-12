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
    this.userEmail.set('')
  }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('user')!)) {
      this.userEmail = this.authService.userdata;
    } else {
      this.userEmail.set(JSON.parse(localStorage.getItem('user')!)?.email);
    }
  }


  logout() {
    this.authService.logout();
  }

}
