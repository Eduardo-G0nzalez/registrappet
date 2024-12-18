// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.username && this.password) {
      const success = this.authService.login(this.username, this.password);
      if (success) {
        this.router.navigate(['/menu']);
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } else {
      alert('Por favor, ingrese su nombre de usuario y contraseña');
    }
  }

  irResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }

}
