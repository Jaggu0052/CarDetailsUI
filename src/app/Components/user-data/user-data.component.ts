// import { ApiService } from 'src/app/Services/Api/api.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner';
import { CarDetailsService } from 'src/app/Services/CarDetailsData/car-details.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserStoreService } from 'src/app/Services/userDataStore/user-store.service';
// import { MobileDetailsService } from 'src/app/Services/Mobile/mobile-details.service';
// import { ProfileDataService } from 'src/app/Services/profiledata/profile-data.service';
// import { BooksService } from 'src/app/Services/Books/books.service';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  pagiCount: number = 1; // this is for Pagination
  CarData : any = [];
  public role: string = '';
  public fullName : any = '' ;

  // SearechName
  name : string = "" ;

 

  //  Bookdetails data
  Bookdetails : any = [] ; 
  

 
  
  
  constructor(
     private loginService : LoginService ,
     private UserStore : UserStoreService,
     private route :ActivatedRoute ,
     private _CarDetailsService : CarDetailsService,
     
    ){}




  

  

  ngOnInit() : void {

    
    this.GetcarDetails();


    
    //userFullName

    this.UserStore.GetFUllNameFOrmStore().subscribe((val: any)=>{
      const fullnameFromToken = this.loginService.GetFullNameForm();
      this.fullName = val || fullnameFromToken
      console.log(this.fullName);
    })


    //UserRole

      this.UserStore.GetRoleFOrmStore().subscribe((val: any)=>
        {
          const roleFormToken =  this.loginService.getROleFOrmtheToken();
          this.role =    val || roleFormToken
          console.log(this.role);
        }
      )


  }

  // get cardetails

  GetcarDetails() : any {
    
   return  this._CarDetailsService.GetCarDetailsList().subscribe({
      next:((res:any)=>{
        this.CarData = res;
    
      })
    })
  }

  // getById data 

  isSHow : boolean = false ;
  CarDetails ! : any ;
  
  GetByIdCarDetails( id : number ) : any {

    this.isSHow = true ;
  
  return  this._CarDetailsService.GetByIdCarData(id).subscribe(
    {
      next:((res:any)=>{
        this.CarDetails = res;
        console.log(res);
      })
    }
  )
  }


  // delete 

  DeleteCarDetails(id : number) : any {
    let data : boolean = confirm("Are you sure delete this car");
    if(data){
      return this._CarDetailsService.DeleteCarDetails(id).subscribe(
        {
          next : (res : any) =>{
            this.GetcarDetails();
          }
        }
      )
    }
    else{
      return this.GetcarDetails();
    }
    
  }


  

  




  //account SignOut


  SIgnOut(){
    this.loginService.SignOut();
  }


  // BooksData Get



  
}
