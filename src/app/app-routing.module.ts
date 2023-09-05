import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BookingComponent } from './booking/booking.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

import { ProfileComponent } from './profile/profile.component';

import { StatusComponent } from './status/status.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { LaundryComponent } from './laundry/laundry.component';
import { AnnoucementComponent } from './annoucement/annoucement.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogsComponent } from './logs/logs.component';


const routes: Routes = [
    {path: '',redirectTo:'home',pathMatch:'full' },
  {path: 'home',component:HomePageComponent},
  {path: 'sign',component:LoginSignupComponent},

  {path: 'booking',component:BookingComponent},
  {path: 'chat',component:ChatComponent},
  {path: 'accounts',component:ManageAccountsComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'tracking',component:StatusComponent},
  {path: 'laundry',component:LaundryComponent},
  {path: 'sales',component:ManageSalesComponent},
  {path: 'announcement',component:AnnoucementComponent},
  {path: 'nav',component:NavigationComponent},
  {path: 'logs',component:LogsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const roott = [
  HomePageComponent,LoginSignupComponent,BookingComponent,ChatComponent,ManageAccountsComponent,
  ProfileComponent,StatusComponent,
]
