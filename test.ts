// src/test.ts

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Mock de localStorage global
class LocalStorageMock {
  private storage: { [key: string]: string } = {};

  clear() {
    this.storage = {};
  }

  getItem(key: string): string | null {
    return this.storage[key] || null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }
}

// Configuración global para usar el mock de localStorage
Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });

// Inicialización del entorno de pruebas
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
