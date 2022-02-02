import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
 export class AuthGuard implements CanActivate {
 
  constructor(private _router: Router) {
  }
 
  canActivate(): boolean {
    if(window.sessionStorage.getItem("userData"))
    return true;
    else{
      this._router.navigate(["/home"])
      return false;
    }
  }
 
 }