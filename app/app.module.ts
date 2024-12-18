import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

@NgModule({
  declarations: [
    AppComponent,          // Declarar el componente principal
    PopoverMenuComponent,  // Declarar PopoverMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configurar Ionic
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes personalizados de Ionic
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync(), // Proveedor de animaciones asíncronas
  ],
  bootstrap: [AppComponent], // Componente principal de la aplicación
})
export class AppModule {}
