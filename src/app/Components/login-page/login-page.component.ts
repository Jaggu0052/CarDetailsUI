import { Component , Input, OnInit } from '@angular/core';

import {FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validationFrom from 'src/app/helpers/validationFrom';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserStoreService } from 'src/app/Services/userDataStore/user-store.service';
import { UserDataComponent } from '../user-data/user-data.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username ! : string ;

  @Input() urlImage : any;


 //html Password Variable
  isText : boolean = false;
  eyeIcon: string = "fa fa-eye-slash" ;
  type = "password";



  // FormBuilder variable

  loginFrom !: FormGroup ;

 
  constructor(
    private fb : FormBuilder ,
     private loginSevices : LoginService , 
     private router : Router , 
     private toast: NgToastService 
     , private  usersStoreService : UserStoreService
     ){

  }
  // Loader Hide and show 
  loader : boolean = true;
  displayLoginPage : boolean = false;

  // Form Validation
  ngOnInit(){
    
    this.loginFrom = this.fb.group(
      {
        UserName : [null ,  Validators.required ],
        Password : [null ,[ Validators.required , Validators.minLength(8)]]
      }
    )

    // time to loader

    setTimeout(() => {
      this.loader = false;
      this.displayLoginPage = true;
    } , 1000);


  }



  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa fa-eye-slash";
    this.isText ?  this.type = "text" : this.type = "password";

  }

   onSubmit (){
    if(this.loginFrom.valid)
    {
      var UserNameString  = JSON.stringify(this.loginFrom.value);
      
      
      var parseUserName = JSON.parse(UserNameString) !;
      //console.log(parseUserName['UserName']);
      
      
      
      this.loginSevices.LoginUser(this.loginFrom.value).subscribe({
        next:((res:any)=>{
          //console.log(res)
           
          //console.log(res.message);
          this.loginSevices.storingToken(res.token);
          let tokenPayLoad = this.loginSevices.DecodeTOken();
          this.usersStoreService.SetFullNameFOrmStore(tokenPayLoad.unique_name);
          this.usersStoreService.SetRoleFOrmStore(tokenPayLoad.role);
          this.toast.success({detail : "SUCCESS" , summary : res.message , duration : 5000  } )
          this.loginFrom.reset();
          this.router.navigate(['/Home']);
        }),
        error:((error:any)=>{
          
          console.log(error.error.message )
          this.toast.error({detail : "Error"  , summary : error?.error.message , duration : 5000})
        })
      })
    }
    else{
      console.log("form is Not Valid");
      validationFrom.ValidatorAllFieldsCheck(this.loginFrom);
        
      this.toast.error({detail : "Error"  , summary : "Form is Invalid" , duration : 5000})

    }
  }

 
  
}
