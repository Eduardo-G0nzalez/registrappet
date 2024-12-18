
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

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

describe('AuthService', () => {
  let servicio: AuthService;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });

    TestBed.configureTestingModule({});
    servicio = TestBed.inject(AuthService); 
  });

  it('debería ser creado', () => {
    expect(servicio).toBeTruthy();
  });

  it('debería registrar un nuevo usuario correctamente', () => {
    const resultado = servicio.register('usuario', 'contraseña', 'alumno');
    expect(resultado).toBeTrue();
  });

  it('debería devolver false si el usuario ya existe', () => {
    servicio.register('usuario', 'contraseña', 'alumno');
    const resultado = servicio.register('usuario', 'otraContraseña', 'alumno');
    expect(resultado).toBeFalse();
  });

  it('debería devolver true para credenciales válidas', () => {
    servicio.register('usuario', 'contraseña', 'alumno');
    const resultado = servicio.login('usuario', 'contraseña');
    expect(resultado).toBeTrue();
  });

  it('debería devolver false para credenciales incorrectas', () => {
    const resultado = servicio.login('usuario', 'contraseñaIncorrecta');
    expect(resultado).toBeFalse();
  });

  it('debería devolver true cuando el usuario está autenticado', () => {
    servicio.register('usuario', 'contraseña', 'alumno');
    servicio.login('usuario', 'contraseña');
    expect(servicio.isAuthenticated()).toBeTrue();
  });

  it('debería devolver false cuando el usuario no está autenticado', () => {
    expect(servicio.isAuthenticated()).toBeFalse();
  });

  it('debería devolver el rol correcto después de hacer login', () => {
    servicio.register('usuario', 'contraseña', 'alumno');
    servicio.login('usuario', 'contraseña');
    expect(servicio.getUserRole()).toBe('alumno');
  });

  it('debería devolver null si el usuario no está autenticado', () => {
    expect(servicio.getUserRole()).toBeNull();
  });

  it('debería hacer logout correctamente', () => {
    servicio.register('usuario', 'contraseña', 'alumno');
    servicio.login('usuario', 'contraseña');
    servicio.logout();
    expect(servicio.isAuthenticated()).toBeFalse();
    expect(servicio.getUserRole()).toBeNull();
  });
});
