import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { UserDataComponent } from './Components/user-data/user-data.component';
import { ShowItemDetailsComponent } from './Components/show-item-details/show-item-details.component';
import { CanAuthGuard } from './guards/can-auth.guard';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: "login" , pathMatch : 'full' },
  {path : "login" , component:LoginPageComponent },
  {path : "signUp" , component : SignUpComponent},
  {path : "Home" , component: UserDataComponent , canActivate : [CanAuthGuard]},
  {path : "CarData" , component : ShowItemDetailsComponent } ,
  {path : "CarData/:id" , component: ShowItemDetailsComponent},
  {path: '**', redirectTo: "login" , pathMatch : 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
