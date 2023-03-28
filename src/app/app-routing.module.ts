import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PickupTableComponent } from './pickup-table/pickup-table.component';
import { ProfileComponent } from './profile/profile.component';
import { StatusTableComponent } from './status-table/status-table.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
    {path: '',redirectTo:'home',pathMatch:'full' },
  {path: 'home',component:HomePageComponent},
  {path: 'sign',component:LoginSignupComponent},
  {path: 'about',component:AboutUsComponent},
  {path: 'booking',component:BookingComponent},
  {path: 'chat',component:ChatComponent},
  {path: 'pickup',component:PickupTableComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'tracking',component:StatusComponent},
  {path: 'status',component:StatusTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const roott = [
  HomePageComponent,LoginSignupComponent,AboutUsComponent,BookingComponent,ChatComponent,PickupTableComponent,
  ProfileComponent,StatusComponent,StatusTableComponent
]
