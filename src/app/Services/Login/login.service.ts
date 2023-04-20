import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userPayLoad: any;

  constructor(private http: HttpClient, private router: Router) {
    
    this.userPayLoad = this.DecodeTOken();
  }




private  baseUrl:string='https://localhost:44375/api/SignUp/'

// https://localhost:44375/api/CarDetails/GetAllCarDetails

// /api/SignUp/authenticateLogin


  LoginUser(body: any): any {
    
    return this.http.post<any>(`${this.baseUrl}authenticateLogin`, body); //https://localhost:44300/api/User/authenticate
  }

  storingToken(TokenValue: string) {
    
    localStorage.setItem("Token", TokenValue);
  }

  GetToken(): any {
  
      return localStorage.getItem("Token");
    
  }

  IsLoggedIn(): any {
    return !!localStorage.getItem("Token");
  }

  SignOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


  DecodeTOken(): any {
    const jwtHelper = new JwtHelperService();
    const token = this.GetToken();

    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);


  }

  GetFullNameForm(): any {
    if (this.userPayLoad) {
      return this.userPayLoad.unique_name;
    }
  }

  getROleFOrmtheToken(): any {
    if (this.userPayLoad) {
      return this.userPayLoad.role;
    }
  }



}
