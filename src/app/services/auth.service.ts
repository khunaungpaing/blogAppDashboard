import {Injectable, signal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate = signal<boolean>(false);
  userdata = signal<string>('');


  constructor(private fireAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    this.isAuthenticate.set(JSON.parse(localStorage.getItem('user')!));
  }

  get showAuth(): boolean {
    return this.isAuthenticate();
  }

  login(email: any, password: any) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('login successfully...');
      this.loadUser();
      this.isAuthenticate.set(true);
      this.router.navigate(['post']).then(r => {
      });
    }).catch(e => {
      this.toastr.warning(e);
    })
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.toastr.success('User log out successfully');
      localStorage.removeItem('user');
      this.isAuthenticate.set(false);
      this.router.navigate(['login']).then(r => {
      });
    })
  }

  private loadUser() {
    this.fireAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userEmail(localStorage.getItem('user'));
    })
  }

  private userEmail(data: any) {
    if (data) {
      this.userdata.set(JSON.parse(data!)?.email);
    }
  }
}
