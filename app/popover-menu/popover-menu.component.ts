import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-popover-menu',
  template: `
    <ion-list>
      <ion-item button (click)="logout()">
        <ion-icon name="log-out-outline" slot="start"></ion-icon>
        Cerrar sesión
      </ion-item>
    </ion-list>
  `,
})
export class PopoverMenuComponent {
  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private authService: AuthService
  ) {}

  logout() {
    // Cierra el popover
    this.popoverController.dismiss();

    // Llama al servicio de logout
    this.authService.logout();

    // Redirige al login
    this.router.navigate(['/login']);
  }
}
