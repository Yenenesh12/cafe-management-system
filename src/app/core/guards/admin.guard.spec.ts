import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'isAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for admin', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.isAdmin.and.returnValue(true);
    expect(guard.canActivate({} as any, {} as any)).toBe(true);
  });

  it('should redirect for non-admin', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.isAdmin.and.returnValue(false);
    guard.canActivate({} as any, {} as any);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
