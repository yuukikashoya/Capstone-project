import { formatDate } from '@angular/common';
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
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
  logs!: Observable<any[]>;
  constructor(public router:Router,public database:Database
    ,private FireDb: AngularFireDatabase) {
      this.logs = FireDb.list('/logs').valueChanges();
     
    const sessionValue = sessionStorage.getItem('type');
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
         const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
      const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
   
      const starCountRef = ref(this.database, 'sales/Pricing');
   onValue(starCountRef, (snapshot) => {
    const db = snapshot.val();  
// get the value of the staff
      this.defultpricing = db.pricing,
      this.defultkilo = db.Kilo
  
    });



    if (sessionValue == "1" ) {
      this.daily = FireDb.list('/sales/daily').valueChanges();
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

currentDate: Date = new Date();
  currentday = formatDate(new Date(), 'MM~dd~yyyy', 'en')
  getFormattedDate(): string {
    return formatDate(this.currentDate, 'MM~dd~yyyy', 'en');
  }
addweek(){
  if(this.currentweek == 52){
    this.currentweek = 1
  }
  else{
  this.currentweek = this.currentweek + 1 ;
}
}
minusweek(){
  if(this.currentweek == 1){
    this.currentweek = 52
  }
  else{
  this.currentweek = this.currentweek - 1 ;
}
}
addyear(){
  this.currentyear = this.currentyear + 1 ;
}
minusyear(){
  this.currentyear = this.currentyear - 1 ;
}

editshow = false
graphshow = true
table =false
edittime(){
  this.editshow = true
  this.graphshow = false
}
cacel(){
  this.editshow = false
  this.graphshow = true
}
defultpricing = 0
defultkilo = 0
tabletime(){
  this.table = true
  this.graphshow = false
}
closetable(){
  this.table = false
  this.graphshow = true
}
updatepricing(){
  if(this.defultkilo && this.defultpricing && this.defultkilo != 0 && this.defultpricing != 0){
    set(ref(this.database, 'sales/Pricing/'), {
      Kilo: this.defultkilo,
      pricing: this.defultpricing
     }); 
     this.editshow = false
  this.graphshow = true
  alert("Price or Kilo Updated")
  }
}
selectedDate: Date = new Date();
@Output() dateSelected = new EventEmitter<Date>();

onDateSelected() {
  return formatDate(this.currentDate, 'MM~dd~yyyy', 'en');
}

isDropdownVisible = false;
weeks = Array.from({ length: 52 }, (_, i) => i + 1);

toggleDropdown() {
  this.isDropdownVisible = !this.isDropdownVisible;
}

selectWeek(week: number) {
  this.currentweek = week;
  this.isDropdownVisible = false;
}

}