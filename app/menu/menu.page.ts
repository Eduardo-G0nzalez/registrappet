import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  username: string = '';
  role: 'docente' | 'alumno' | null = null;
  registrarRuta: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.username = this.authService.getUsername() || 'Invitado';
    this.role = this.authService.getUserRole();

    this.registrarRuta = this.role === 'docente' ? '/qr' : '/scan-qr';
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: event,
      translucent: true,
    });
    await popover.present();
  }
}
