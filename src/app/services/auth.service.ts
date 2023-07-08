import {effect, Injectable, signal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate = signal<boolean>(false);

  public isEffectItem = effect(() => {
    console.log('effect data', this.isAuthenticate());
    return this.isAuthenticate();
  })

  constructor(private fireAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
  }

  get showAuth(): boolean {
    return this.isAuthenticate();
  }

  async login(email: any, password: any) {
    await this.fireAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('login successfully...');
      this.loadUser();
      this.isAuthenticate.set(true);
      this.router.navigate(['/']);
    }).catch(e => {
      this.toastr.warning(e);
    })
  }

  async logout() {
    this.fireAuth.signOut().then(() => {
      this.toastr.success('User log out successfully');
      localStorage.removeItem('user');
      this.isAuthenticate.set(false);
      this.router.navigate(['/login']);
    })
  }

  loadUser() {
    this.fireAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    })
  }
}
