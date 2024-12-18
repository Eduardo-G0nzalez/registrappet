import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guardia: AuthGuard;
  let servicioAuthSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const servicioAuthMock = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getUserRole']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: servicioAuthMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guardia = TestBed.inject(AuthGuard);
    servicioAuthSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería ser creado', () => {
    expect(guardia).toBeTruthy();
  });

  it('debería permitir la activación si el usuario está autenticado', () => {
    servicioAuthSpy.isAuthenticated.and.returnValue(true);
    servicioAuthSpy.getUserRole.and.returnValue('docente');

    expect(guardia.canActivate({ routeConfig: { path: 'qr' } } as any)).toBeTrue();
  });

  it('debería denegar la activación y redirigir a login si el usuario no está autenticado', () => {
    servicioAuthSpy.isAuthenticated.and.returnValue(false);

    expect(guardia.canActivate({ routeConfig: { path: 'qr' } } as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Prueba que los docentes NO pueden acceder a 'scan-qr' y se redirigen a /login
  it('debería denegar el acceso a la ruta scan-qr para roles no-alumno', () => {
    servicioAuthSpy.isAuthenticated.and.returnValue(true);  // Usuario autenticado
    servicioAuthSpy.getUserRole.and.returnValue('docente'); // El rol es 'docente'

    // Verificar que se deniega el acceso a 'scan-qr' para docentes
    const canActivate = guardia.canActivate({ routeConfig: { path: 'scan-qr' } } as any);
    
    expect(canActivate).toBeFalse(); // El acceso a la ruta debe ser denegado
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Redirigir a '/login' en vez de '/home'
  });

  // Asegurarse de que un alumno pueda acceder a 'scan-qr'
  it('debería permitir el acceso a la ruta scan-qr para alumnos', () => {
    servicioAuthSpy.isAuthenticated.and.returnValue(true);  // Usuario autenticado
    servicioAuthSpy.getUserRole.and.returnValue('alumno'); // El rol es 'alumno'

    // Verificar que se permite el acceso a 'scan-qr' para alumnos
    const canActivate = guardia.canActivate({ routeConfig: { path: 'scan-qr' } } as any);

    expect(canActivate).toBeTrue(); // El acceso a la ruta debe ser permitido
  });

  it('debería denegar el acceso a la ruta scan-qr si no está autenticado', () => {
    servicioAuthSpy.isAuthenticated.and.returnValue(false);  // Usuario no autenticado

    // Verificar que se deniega el acceso a 'scan-qr' si no está autenticado
    const canActivate = guardia.canActivate({ routeConfig: { path: 'scan-qr' } } as any);

    expect(canActivate).toBeFalse(); // El acceso debe ser denegado
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Redirigir a '/login'
  });
});
