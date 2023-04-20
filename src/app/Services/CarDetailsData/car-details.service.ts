import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {


  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://localhost:44375/api/CarDetails/"

  //GetAll

  GetCarDetailsList(): any {
    return this.http.get<any>(`${this.baseUrl}GetAllCarDetails`);
  }

  //GetByIda


  GetByIdCarData(id: number): any {
    return this.http.get<any>(`${this.baseUrl}GetByIdCarDetails/` + id);
  }

  //update

  UpdateCarDetails(body: any): any {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    return this.http.put<any>(`${this.baseUrl}UpdateCarDetails`, body, {
      headers: headers
    });
  }

  // delete 
  DeleteCarDetails(id: number): any {

    return this.http.delete<any>(`${this.baseUrl}DeleteCarDetails/` + id)
  }

  //  SaveData 

  SaveCarData(body: any): any {

    return this.http.post<any>('https://localhost:44375/api/CarDetails/InsertCarDetils', body); // /api/CarDetails/InsertCarDetils
  }





}
