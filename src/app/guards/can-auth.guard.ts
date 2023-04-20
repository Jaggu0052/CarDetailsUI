import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { LoginService } from '../Services/Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CanAuthGuard implements CanActivate {
  
  constructor(private toster : NgToastService,private router : Router ,private loginService : LoginService ){}
  
  
  
  canActivate() : boolean{
    
    if(this.loginService.IsLoggedIn()){
      return true;
    }
    else
    {
      this.toster.error({detail : "Error"  , summary : "Please Login First" , duration : 5000 });
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
