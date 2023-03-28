import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { BookingComponent } from './booking/booking.component';
import { StatusComponent } from './status/status.component';
import { ChatComponent } from './chat/chat.component';
import { AboutUpComponent } from './about-up/about-up.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { StatusTableComponent } from './status-table/status-table.component';
import { PickupTableComponent } from './pickup-table/pickup-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    LoginSignupComponent,
    BookingComponent,
    StatusComponent,
    ChatComponent,
    AboutUpComponent,
    ProfileComponent,
    AdminTableComponent,
    StatusTableComponent,
    PickupTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
