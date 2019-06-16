import { CanActivate,
ActivatedRouteSnapshot,
RouterStateSnapshot , CanActivateChild
} from '@angular/router';
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Router, RouterModule} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild {
  constructor(private authService: AuthService , private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean {
                return this.authService.isAuthenticated()
                .then(
                  (authenticated: boolean) => {
                    if (authenticated) {
                      return true;
                    } else {
                      this.router.navigate(['/']);
                    }
                  }
                );
              }

    canActivateChild(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean{
                  return this.canActivate(route,state);
    }

}
