import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {AuthService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private IsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.authService.isLoggedIn.subscribe(val => this.IsLoggedIn.next(val));
    if (!this.IsLoggedIn) {
      this.router.navigate(['/login']);
    }
    return this.IsLoggedIn.asObservable();
  }
}
