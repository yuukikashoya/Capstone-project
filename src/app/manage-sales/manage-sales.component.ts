import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

currentincomeweek = 0
currentsaleweek = 0
currentincomeyear = 0
currentsaleyear = 0
  constructor(public router:Router,public database:Database) {

    const sessionValue = sessionStorage.getItem('type');
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
         const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
      const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    
    if (sessionValue == "1" ) {
 
      this.currentweek =  currentWeekNumber ;
      const starCountRef = ref(this.database, 'sales/week/' + currentWeekNumber);
      onValue(starCountRef, (snapshot) => {
       const db = snapshot.val();  
       this.currentincomeweek = db.income
       this.currentsaleweek = db.sales
       });
       this.currentweek =  currentWeekNumber ;
       const starCountRef1 = ref(this.database, 'sales/year/' + this.currentyear);
       onValue(starCountRef1, (snapshot) => {
        const db1 = snapshot.val();  
        this.currentincomeyear = db1.income
        this.currentsaleyear = db1.sales
        });
  
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }
currentweek = 0
currentyear = 0
  weekk(){
    const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

  this.currentweek =  currentWeekNumber ;
  set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + 200,
sales:  this.currentsaleweek + 1

  
   }); 
   const ttoday = new Date();
   let tttodate = ttoday.getFullYear();
   this.currentyear = tttodate + 0
   set(ref(this.database, 'sales/year/' + this.currentyear), {
    income: this.currentincomeyear + 200,
    sales:  this.currentsaleyear + 1
    
      
       }); 
  }
}