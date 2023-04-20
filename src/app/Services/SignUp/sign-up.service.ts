import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  baseUrl:string='https://localhost:44375/api/SignUp/';
  constructor( private http: HttpClient) { }

  SignUpUser(body : any) : any
  {
    return this.http.post<any>(`${this.baseUrl}registerOrSignUp` , body); 
    

    // https://localhost:44375/api/SignUp/registerOrSignUp
    
  }

}
