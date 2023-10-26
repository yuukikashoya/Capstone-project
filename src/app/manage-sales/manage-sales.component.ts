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
  cd!: Observable<any[]>;
  daily!: Observable<any[]>;
  week!: Observable<any[]>;
  year!: Observable<any[]>;
  logs!: Observable<any[]>;
  currentweek = 0
  currentyear = 0
  currentDate: Date = new Date();
  currentday = formatDate(new Date(), 'MM~dd~yyyy', 'en')
  editshow = false
  graphshow = true
  table =false
  defultpricing = 0
  defultkilo = 0


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
      this.cd = FireDb.list('/sales/daily'+this.currentday).valueChanges();
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }

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


edittime(){
  this.editshow = true
  this.graphshow = false
}

cacel(){
  this.editshow = false
  this.graphshow = true
}

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
transac = ""
sale = ""
gsale = ""
csale = ""
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
  async printtoday(){
  const starCountRef = ref(this.database, '/sales/daily/' + this.currentday);
  onValue(starCountRef, (snapshot) => {
   const ad = snapshot.val();  
this.sale = ad.income
this.gsale = ad.gsales
this.csale = ad.csales
this.transac = ad.sales

   }); 
   await this.delay(1000);
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // Create content for the print window
  const printContent = `
    <html>
      <head>
      <style>
      @page{
       size:50mm auto;
       
      }
 
      body{
    
       margin-left: -10px;
       size:50mm auto;
       text-align:center;
       font-family: Helvetica, Sans-Serif;
       padding:10px;
       page-break-after:always;
      }
      .container {
       display: flex;
       justify-content: space-between;
     
   }

   .left {
     padding:0;
       text-align: left;
   }

   .right {
     padding:0;
       text-align: right;
       margin-left:-15px
   }
      </style>
        <title>Print Number</title>
      </head>
      <body>
      <br><hr style="border-top:1px white;"><br>
        <h3 class="to">IM CAFE & LAUNDROMAT</h1>
           <p>Old Albay District, Legazpi City, Albay
         </p><hr><br>
        <h2>Sales summary</h2>
        <br><br><hr><br>
        <h4>Offical Receipt</h4>
        <div class="container">
        <div class="left">
            <p>Date:</p>
            <p>Tracsaction</p>
            <p>Gcash:</p>
            <p>Cash:</p>
            <p>Total sales:</p>

        </div>
        <div class="right">
            <p>${this.currentday}</p>
            <p>${this.transac}</p>
            <p>${this.gsale}</p>
            <p>${this.csale}</p>
            <p>${this.sale}</p>

        </div>
    </div>
    <br>
      </body>
    </html>
  `;

  // Open the print window
  const printWindow = window.open('', 'PrintWindow', `width=${screenWidth},height=${screenHeight}`);
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Print the content
    printWindow.print();
    setTimeout(() => {
      printWindow.close();
   }, 1000); // Adjust the delay time as needed
  } 
}
}