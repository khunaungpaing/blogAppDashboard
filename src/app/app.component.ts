import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blogAppDashboard';
  authStatus = signal<boolean>(false);

  constructor(private authServices: AuthService) {
    this.authStatus = this.authServices.isAuthenticate;
  }

  ngOnInit() {
  }
}
