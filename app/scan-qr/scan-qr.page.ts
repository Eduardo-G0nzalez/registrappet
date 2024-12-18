import { Component, OnDestroy, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  private qrScanner: Html5QrcodeScanner | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startScan();
  }

  startScan() {
    this.qrScanner = new Html5QrcodeScanner(
      'qr-reader', // El ID del contenedor
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    this.qrScanner.render(
      (decodedText) => this.onScanSuccess(decodedText),
      (errorMessage) => this.onScanError(errorMessage)
    );
  }

  onScanSuccess(decodedText: string) {
    console.log('Código QR detectado:', decodedText);
    alert(`Código QR detectado: ${decodedText}`);

    // Redirigir al menú
    this.qrScanner?.clear();
    this.router.navigate(['/menu']);
  }

  onScanError(error: string) {
    console.warn('Error al escanear:', error);
  }

  ngOnDestroy() {
    // Limpiar recursos del escáner
    this.qrScanner?.clear();
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
