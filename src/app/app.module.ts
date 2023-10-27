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
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { LaundryComponent } from './laundry/laundry.component';
import { AnnoucementComponent } from './annoucement/annoucement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CustomConfirmDialogComponent } from './dialog.component';
import { LogsComponent } from './logs/logs.component';
import { SalesGraphComponent } from './sales-graph/sales-graph.component';
import { termsclass } from './tdialog.component';
import { DatePipe } from '@angular/common';

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
    ManageAccountsComponent,
    ManageSalesComponent,
    LaundryComponent,
    AnnoucementComponent,
    CustomConfirmDialogComponent,
    LogsComponent,
    SalesGraphComponent,
    termsclass
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment. firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
