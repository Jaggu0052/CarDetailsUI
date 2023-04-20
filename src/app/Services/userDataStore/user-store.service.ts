import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

  public GetRoleFOrmStore() : any
  {
    return this.role$.asObservable();


  }

  public SetRoleFOrmStore(role : string){
    this.role$.next(role);

  }

  public GetFUllNameFOrmStore() : any {
    return this.fullName$.asObservable()

  }

  public SetFullNameFOrmStore(fullName : string){
     this.fullName$.next(fullName);
}


}
