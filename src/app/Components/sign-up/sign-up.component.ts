import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignUpService } from 'src/app/Services/SignUp/sign-up.service';
import validationFrom from 'src/app/helpers/validationFrom';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  isText : boolean = false;
  eyeIcon: string = "fa fa-eye-slash" ;
  type = "password";

   // FormBuilder variable

   signUpFrom !: FormGroup ;


   constructor(private fb : FormBuilder , 
    private signUpservice : SignUpService ,
     private router : Router  ,
      private toast: NgToastService, 
      private spinner: NgxSpinnerService){

   }
 
 
   ngOnInit(){
     this.signUpFrom = this.fb.group(
       {
        FirstName : [null , [ Validators.required ] ],
        LastName : [null ,[ Validators.required ]],
        Email : [null ,Validators.required ],
         UserName : [null , [ Validators.required ] ],
         Password : [null ,[ Validators.required ,  Validators.minLength(8)]],
         
       }

     )
     this.spinner.show();

     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1000);
   }
 


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa fa-eye-slash";
    this.isText ?  this.type = "text" : this.type = "password";

  }


  onSubmitbtn(){
    
    if(this.signUpFrom.valid)
    {
      console.log(this.signUpFrom.value)
      
      this.signUpservice.SignUpUser(this.signUpFrom.value).subscribe(
        {
          next:((res : any)=>
          { 
            
            console.log(res.message);
            this.toast.success({detail : "Success" , summary : res.message , duration : 5000 });
            this.signUpFrom.reset();
            this.router.navigate(['login']);

          }),
            error:((error : any)=>
            { 
              
              console.log(error?.error.message )
              this.toast.error({detail : "Error"  , summary : error?.error.Message , duration : 5000})
            })
        })
    }
    else{
      console.log("form is Not Valid")

      validationFrom.ValidatorAllFieldsCheck(this.signUpFrom);
      

      this.toast.error({detail : "Error" , summary :"Form is Invalid" , duration : 5000});
      

    }
  }
}
