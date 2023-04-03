import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

import { LoginSignupComponent } from './login-signup/login-signup.component';
import { BookingComponent } from './booking/booking.component';
import { StatusComponent } from './status/status.component';
import { ChatComponent } from './chat/chat.component';

import { ProfileComponent } from './profile/profile.component';


import { NavigationComponent } from './navigation/navigation.component';
import { AboutUsComponent } from './about-us/about-us.component';

import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { LaundryComponent } from './laundry/laundry.component';
import { AnnoucementComponent } from './annoucement/annoucement.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,

    LoginSignupComponent,
    BookingComponent,
    StatusComponent,
    ChatComponent,

    ProfileComponent,

    NavigationComponent,
    AboutUsComponent,

    ManageAccountsComponent,
    ManageSalesComponent,
    LaundryComponent,
    AnnoucementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
