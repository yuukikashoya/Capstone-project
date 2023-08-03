import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {
  daily!: Observable<any[]>;
  week!: Observable<any[]>;
  year!: Observable<any[]>;

  constructor(public router:Router,public database:Database
    ,private FireDb: AngularFireDatabase) {

    const sessionValue = sessionStorage.getItem('type');
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
         const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
      const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    
    if (sessionValue == "1" ) {
      this.week = FireDb.list('/sales/week').valueChanges();
      this.year = FireDb.list('/sales/year').valueChanges();
      this.currentweek =  currentWeekNumber ;
    
  
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }
currentweek = 0
currentyear = 0




addweek(){
  this.currentweek = this.currentweek + 1 ;
}
minusweek(){
  this.currentweek = this.currentweek - 1 ;
}
addyear(){
  this.currentyear = this.currentyear + 1 ;
}
minusyear(){
  this.currentyear = this.currentyear - 1 ;
}



}