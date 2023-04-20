import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../Services/Login/login.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService , private toster : NgToastService  , private route : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken = this.loginService.GetToken()

    if(myToken)
    {
        request = request.clone({
        setHeaders : {Authorization : `Bearer ${myToken}`}
      });
    }

    return  next.handle(request).pipe(
      catchError((err : any) =>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            this.toster.warning({detail : "Warning" , summary : "Token Was Expired Please Login Again" , duration : 5000});
            this.route.navigate(['login']);
          }
        }
        console.log(err?.error.message)
        return throwError(()=> Error( `${this.toster.error({detail : "Error" , summary : err?.error.message , duration : 5000})}` ))
      })
    );
  }
}
