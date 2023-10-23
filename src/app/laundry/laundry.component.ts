import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, remove, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {
  pickup!: Observable<any[]>;
  laundry!: Observable<any[]>;
  deliverylist!: Observable<any[]>;
  customerpickuplist!: Observable<any[]>;
  currentsaledaily = 0
  currentincomedaily = 0
  currentweek = 0
  currentyear = 0
  currentincomeweek = 0
  currentsaleweek = 0
  currentincomeyear = 0
  currentsaleyear = 0
  currencyAmount = '₱150.00';
  amountInInteger!: number;
  upid = ""
  upusername = ""
  upname = ""
  upuid = ""
  upphonenumber = ""
  upadress= ""
  upfor = ""
  uppacks = 0
  laid = ""
  lausername = ""
  laname = ""
  lauid = ""
  laphonenumber = ""
  laadress = ""
  lafor = ""
  lakilo = ""
  lapack = ""
  laprice = ""
  lastatus = ""
  defultkilo = 7
  defultpricing = 150
  decimal = 0
  pack = 0
  total = 0
  remover = 0
  decimal1 = 0
  uuid = ""
  PKactive = true;
  Dactive = false;
  Wactive = false;
  Pickupactive = false;
  PUactive = false;
  WUactive = false;
  CPKactive = false;
  addLactive = false
  confirmid = ""
  confirmname = ""
  confirmusername = ""
  confirmuid = ""
  confirmpayed = ""
  confirmpack = ""
  confirmaddress = ""
  nav = true
  pickedactive = false
  deliveredavtive = false
  changedd="Pick up at the shop"
  changemode=false
  phonenumber= ""
  location= ""
  name=""
  username=""
  uid= ""
  cpacks= 0
  ccash = 0
  cgcash = 0
  wcash = 0
  wgcash = 0
  ycash = 0 
  ygcash = 0

  paymentMethod= "unpaid"
  constructor(private FireDb: AngularFireDatabase,
     public database:Database,public router:Router,
     private smsService: SmsService) { 
      this.userlist = FireDb.list('/client').valueChanges();
      const qwer = ref(this.database, 'sales/Pricing');
      onValue(qwer, (snapshot) => {
       const qw = snapshot.val();  
   // get the value of the staff
         this.defultpricing = qw.pricing,
         this.defultkilo = qw.Kilo
       });
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
    // Remove the currency symbol '₱' and the decimal point '.'
    const amountWithoutCurrency = this.currencyAmount.substring(1);
    // Convert to an integer
    this.amountInInteger = parseInt(amountWithoutCurrency);
      const ttoday = new Date();
      let tttodate = ttoday.getFullYear();
      this.currentyear = tttodate + 0
           const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
        const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        const sessionValue = sessionStorage.getItem('type');
    if (sessionValue == "1" ) {
      this.currentweek =  currentWeekNumber ;
      const starCountRef2 = ref(this.database, 'sales/daily/' + dailysalee);
      onValue(starCountRef2, (snapshot) => {
       const db4 = snapshot.val();  
       this.currentincomedaily = db4.income
       this.currentsaledaily = db4.sales
       this.ccash = db4.cash
       this.cgcash = db4.gcash
             if(this.ccash == undefined){
        this.ccash = 0
       }
       if(this.cgcash == undefined){
        this.cgcash = 0
       } 
       });

      this.currentweek =  currentWeekNumber ;
      const starCountRef = ref(this.database, 'sales/week/' + currentWeekNumber);
      onValue(starCountRef, (snapshot) => {
       const db = snapshot.val();  
       this.currentincomeweek = db.income
       this.currentsaleweek = db.sales
       this.wcash = db.cash
       this.wgcash = db.gcash
                if(this.wcash == undefined){
        this.wcash = 0
       }
       if(this.wgcash == undefined){
        this.wgcash = 0
       }
       });

       this.currentweek =  currentWeekNumber ;
       const starCountRef1 = ref(this.database, 'sales/year/' + this.currentyear);
       onValue(starCountRef1, (snapshot) => {
        const db1 = snapshot.val();  
        this.currentincomeyear = db1.income
        this.currentsaleyear = db1.sales
        this.ycash = db1.cash
        this.ygcash = db1.gcash
        if(this.ycash == undefined){
          this.ycash = 0
         }
         if(this.ygcash == undefined){
          this.ygcash = 0
         }
        });

              this.pickup = FireDb.list('/pickup').valueChanges();
      this.laundry = FireDb.list('/laundry').valueChanges();
      this.deliverylist = FireDb.list('/delivery').valueChanges();
      this.customerpickuplist = FireDb.list('/customerpickup').valueChanges();
    } else {
      this.router.navigate(['/sign'])
    }
  }
  ngOnInit(): void {
  }
gettime = ""
getdate = ""
  getupdate(value:any){
    // getting the value
    this.upid = value.id
    this.upusername = value.username
    this.upname = value.name
    this.upuid = value.uid
    this.upphonenumber = value.phonenumber
    this.upadress= value.address
    this.upfor = value.for

    this.PKactive =  false;
    this.PUactive = true;
    this.gettime = value.time
    this.getdate = value.date
    if(value.cpack){
      this.uppacks = value.cpack
      
    }else{
      this.uppacks = 0
    }
  }

  cancelupdate(){
    // clear the value
    this.upid = ""
    this.upusername = ""
    this.upname = ""
    this.upuid = ""
    this.upphonenumber = ""
    this.upadress= ""
    this.upfor = ""
    this.uppacks = 0
    this.PKactive =  true;
    this.PUactive = false;
  }

  getLaundry(value:any){
    // getting the value
    this.laid = value.id
    this.lausername = value.username
    this.laname = value.name
    this.lauid = value.uid
    this.laphonenumber = value.phonenumber
    this.laadress= value.address
    this.lafor = value.for
    this.lakilo = value.kilo
    this.laprice = "₱" + value.total+".00"
    this.lastatus = value.status;
    this.lapack = value.pack;  
    this.Wactive =  false;
    this.WUactive = true;
    this.getdate = value.date
    this.gettime = value.time
    if(value.paymentStatus == "unpaid"){
      this.paymentMethod = "unpaid"
    }else if(value.paymentStatus == "paid" && value.paymentMethod == "gcash"){
      this.paymentMethod = "gcash"
    }else if(value.paymentStatus == "paid" && value.paymentMethod == "cash"){
      this.paymentMethod = "cash"
    }

  }
  cancellaupdate(){
    // clear the value
    this.laid = ""
    this.lausername = ""
    this.laname = ""
    this.lauid = ""
    this.laphonenumber = ""
    this.laadress= ""
    this.lafor = ""
    this.lakilo = ""
    this.laprice = ""
    this.lastatus = ""
    this.lapack = "";  
    this.Wactive =  true;
    this.WUactive = false;
  }

 
update(value:any){
  if(value.kilo == "" || value.kilo == null){
  alert("Put the Kilo")
}else{
   // calculation of pricing
  this.decimal = value.kilo/ this.defultkilo;
  if(this.decimal < 1){
    this.decimal = 1
  }
  this.decimal1 = Math.trunc(this.decimal);
  this.remover = this.decimal -  this.decimal1 
if(this.remover != 0){
this.pack = this.decimal1 + 1
}else{
  this.pack = this.decimal1
}

  this.total = this.pack * this.defultpricing;

  if(this.uppacks !== 0){
    this.pack = this.uppacks
  }
  let pstatus 
  let pmethod
  if(this.paymentMethod == "unpaid"){
     pstatus = "unpaid"
     pmethod = "unpaid"
  }else if(this.paymentMethod == "gcash"){
     pstatus = "paid"
     pmethod = "gcash"
  }else if(this.paymentMethod == "cash"){
     pstatus = "paid"
     pmethod = "cash"
  }
// adding to the database
console.log(value.date)
let myDate = formatDate(new Date(), 'mmss', 'en')
this.uuid =  "L"+myDate+ Math.floor(100 + Math.random() * 99);
set(ref(this.database, 'laundry/' + this.uuid), {
    id: value.pickupid,
    username: value.username,
    name: value.name,
    address:value.address,
    for:value.to,
    phonenumber:value.phonenumber,
   uid: value.userid,
   total: this.total,
   pack: this.pack,
   kilo: value.kilo,
   status: "processing",
paymentMethod:pmethod,
paymentStatus:pstatus,
time:this.gettime,
date:this.getdate
   }); 

    remove(ref(this.database, 'pickup/' + value.pickupid));
        this.upid = ""
        this.upusername = ""
        this.upname = ""
        this.upuid = ""
        this.upphonenumber = ""
        this.upadress= ""
        this.upfor = ""
}
this.PKactive =  true;
this.PUactive = false;
}

showPK(){
  this.PKactive =  true;
  this.Dactive = false;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
  this.addLactive = false
}
showD(){
  this.PKactive =  false;
  this.Dactive = true;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
  this.addLactive = false
}
showW(): void{
  this.PKactive =  false;
  this.Dactive = false;
  this.Wactive = true;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
  this.addLactive = false
}
showpick(){
  this.PKactive =  false;
  this.Dactive = false;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = true;
  this.CPKactive = false;
  this.addLactive = false
}
addLa(){
  this.PKactive =  false;
  this.Dactive = false;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
  this.addLactive = true
}


updatewashing(){
  update(ref(this.database, 'laundry/' + this.laid), {
   status: "washing"
   }); 
   this.Wactive =  true;
   this.WUactive = false;
}

readyfordelivery(){
  
  let pstatus 
  let pmethod
  if(this.paymentMethod == "unpaid"){
     pstatus = "unpaid"
     pmethod = "unpaid"
  }else if(this.paymentMethod == "gcash"){
     pstatus = "paid"
     pmethod = "gcash"
  }else if(this.paymentMethod == "cash"){
     pstatus = "paid"
     pmethod = "cash"
  }
  remove(ref(this.database, 'laundry/' + this.laid));
  set(ref(this.database, 'delivery/' + this.laid), {
    id: this.laid,
    username: this.lausername,
    name: this.laname,
    address:this.laadress,
    phonenumber:this.laphonenumber,
   uid: this.lauid,
   total: this.laprice,
   pack: this.lapack,
   kilo: this.lakilo,
   status: "On the Delivery",
   paymentMethod:pmethod,
   paymentStatus:pstatus,
   time:this.gettime,
   date:this.getdate
   }); 
   const message = "Hello "+ this.laname +", Exciting news! Your fresh laundry packs: "+ this.lapack +", kilos: "+ this.lakilo +" is on its way. Payment amount: "+ this.laprice +". We value your trust and look forward to serving you again.  -I.M CAFE AND LAUNDROMAT";
     this.smsService.sendSMS(this.laphonenumber, message)
       .subscribe(
         (response) => {
           console.log('SMS sent successfully:', response);
         },
         (error) => {
           console.error('Failed to send SMS:', error);
         }
       );
   this.Wactive =  true;
   this.WUactive = false;
}

readyforpickup(){
  let pstatus 
  let pmethod
  if(this.paymentMethod == "unpaid"){
     pstatus = "unpaid"
     pmethod = "unpaid"
  }else if(this.paymentMethod == "gcash"){
     pstatus = "paid"
     pmethod = "gcash"
  }else if(this.paymentMethod == "cash"){
     pstatus = "paid"
     pmethod = "cash"
  }
  remove(ref(this.database, 'laundry/' + this.laid));
  set(ref(this.database, 'customerpickup/' + this.laid), {
    id: this.laid,
    username: this.lausername,
    name: this.laname,
    address:this.laadress,
    phonenumber:this.laphonenumber,
   uid: this.lauid,
   total: this.laprice,
   pack: this.lapack,
   kilo: this.lakilo,
   status: "Ready for Pick up",
   paymentMethod:pmethod,
   paymentStatus:pstatus,
   time:this.gettime,
   date:this.getdate
   }); 
   const message = "Hello "+ this.laname +", Your laundry packs: "+ this.lapack +", kilos: "+ this.lakilo +" is ready for pick up. Payment amount: "+ this.laprice +". Thank you for choosing us. We look forward to serving you again. -I.M CAFE AND LAUNDROMAT";  
     this.smsService.sendSMS(this.laphonenumber, message)
       .subscribe(
         (response) => {
           console.log('SMS sent successfully:', response);
         },
         (error) => {
           console.error('Failed to send SMS:', error);
         }
       );
   this.Wactive =  true;
   this.WUactive = false;
}



cpickup(l:any){
  this.confirmid = l.id
  this.confirmname = l.name
  this.confirmusername = l.username
  this.confirmuid = l.uid
  this.confirmpayed = l.total
  this.confirmpack = l.pack
  this.pickedactive = true
  this.nav = false
this.Pickupactive = false
if(l.paymentStatus == "unpaid"){
  this.paymentMethod = "unpaid"
}else if(l.paymentStatus == "paid" && l.paymentMethod == "gcash"){
  this.paymentMethod = "gcash"
}else if(l.paymentStatus == "paid" && l.paymentMethod == "cash"){
  this.paymentMethod = "cash"
}


}
transacitonid = ""
pickedupyes(){
  let pstatus 
  let pmethod
  if(this.paymentMethod == "unpaid"){
     pstatus = "unpaid"
     pmethod = "unpaid"
  }else if(this.paymentMethod == "gcash"){
     pstatus = "paid"
     pmethod = "gcash"
  }else if(this.paymentMethod == "cash"){
     pstatus = "paid"
     pmethod = "cash"
  }
// temporarty funtion for now
const iaid = sessionStorage.getItem('id');
let myDate = formatDate(new Date(), 'mmss', 'en')
let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
let realtime = formatDate(new Date(), 'hh:mma', 'en')
this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
set(ref(this.database, 'logs/' + this.transacitonid), {
  transacitonid: this.transacitonid,
  pastid: this.confirmid,
  username: this.confirmusername,
  name: this.confirmname,
 uid: this.confirmuid,
 payed: this.confirmpayed,
 pack: this.confirmpack,
 transacby: iaid,
 time: realtime,
 date:realdate,
 type: "picked up",
 paymentMethod:pmethod

 }); 
 const today = new Date();
 const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
 const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
 const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
       // Remove the currency symbol '₱' and the decimal point '.'
       const amountWithoutCurrency = this.confirmpayed.substring(1);
    
       // Convert to an integer
       this.amountInInteger = parseInt(amountWithoutCurrency);

      //  daily 

      if(pmethod == "cash"){
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
      set(ref(this.database, 'sales/daily/' + dailysalee), {
       income: this.currentincomedaily + this.amountInInteger,
       sales:  this.currentsaledaily + 1,
       currentday: dailysalee,
       cash:this.ccash + 1,
        gcash:this.ccash
          }); 

 this.currentweek =  currentWeekNumber ;
 set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + this.amountInInteger,
sales:  this.currentsaleweek + 1,
currentWeekNumber: currentWeekNumber,
cash:this.wcash + 1,
gcash:this.wgcash
 
  }); 
  const ttoday = new Date();
  let tttodate = ttoday.getFullYear();
  this.currentyear = tttodate + 0
  set(ref(this.database, 'sales/year/' + this.currentyear), {
   income: this.currentincomeyear + this.amountInInteger,
   sales:  this.currentsaleyear + 1,
   currentyear: this.currentyear,
cash:this.ycash + 1,
gcash:this.ygcash
   
     
      }); 
      remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }else if (pmethod == "gcash"){
        console.log(this.wgcash)
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
        gcash:this.cgcash + 1,
         currentday: dailysalee,
         cash:this.ccash
       
         
           
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  gcash:this.wgcash + 1,
  cash:this.wcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  gcash:this.ygcash + 1,
  cash:this.ycash
     
       
        }); 
        remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }



}

pickedupno(){
  this.nav = true
this.Pickupactive = true
this.pickedactive = false

}

cdedivered(d:any){

  this.confirmid = d.id
  this.confirmname = d.name
  this.confirmusername = d.username
  this.confirmuid = d.uid
  this.confirmpayed = d.total
  this.confirmpack = d.pack
  this.confirmaddress = d.address
  this.gettime = d.time
  this.getdate = d.date
  if(d.paymentStatus == "unpaid"){
    this.paymentMethod = "unpaid"
  }else if(d.paymentStatus == "paid" && d.paymentMethod == "gcash"){
    this.paymentMethod = "gcash"
  }else if(d.paymentStatus == "paid" && d.paymentMethod == "cash"){
    this.paymentMethod = "cash"
  }

  this.deliveredavtive = true
  this.nav = false
  this.Dactive = false
}

deliveryno(){
  this.nav = true
this.Dactive = true
this.deliveredavtive = false

}
deliveryyes(){
  let pstatus 
  let pmethod
  if(this.paymentMethod == "unpaid"){
     pstatus = "unpaid"
     pmethod = "unpaid"
  }else if(this.paymentMethod == "gcash"){
     pstatus = "paid"
     pmethod = "gcash"
  }else if(this.paymentMethod == "cash"){
     pstatus = "paid"
     pmethod = "cash"
  }
  const iaid = sessionStorage.getItem('id');
  let myDate = formatDate(new Date(), 'mmss', 'en')
  let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
  let realtime = formatDate(new Date(), 'hh:mma', 'en')
  this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
  set(ref(this.database, 'logs/' + this.transacitonid), {
    transacitonid: this.transacitonid,
    pastid: this.confirmid,
    username: this.confirmusername,
    name: this.confirmname,
   uid: this.confirmuid,
   payed: this.confirmpayed,
   pack: this.confirmpack,
   transacby: iaid,
   time: realtime,
   date:realdate,
   type: "delivered",
   deliveredTo:this.confirmaddress,
   paymentMethod:pmethod

  
   }); 
   const today = new Date();
   const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
   const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
   const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
 
   this.currentweek =  currentWeekNumber ;
       // Remove the currency symbol '₱' and the decimal point '.'
       const amountWithoutCurrency = this.confirmpayed.substring(1);
    
       // Convert to an integer
       this.amountInInteger = parseInt(amountWithoutCurrency);
   
    //  daily 
    if(pmethod == "cash"){
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
      set(ref(this.database, 'sales/daily/' + dailysalee), {
       income: this.currentincomedaily + this.amountInInteger,
       sales:  this.currentsaledaily + 1,
       currentday: dailysalee,
       cash:this.ccash + 1,
        gcash:this.ccash
          }); 

 this.currentweek =  currentWeekNumber ;
 set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + this.amountInInteger,
sales:  this.currentsaleweek + 1,
currentWeekNumber: currentWeekNumber,
cash:this.wcash + 1,
gcash:this.wgcash
 
  }); 
  const ttoday = new Date();
  let tttodate = ttoday.getFullYear();
  this.currentyear = tttodate + 0
  set(ref(this.database, 'sales/year/' + this.currentyear), {
   income: this.currentincomeyear + this.amountInInteger,
   sales:  this.currentsaleyear + 1,
   currentyear: this.currentyear,
cash:this.ycash + 1,
gcash:this.ygcash
   
     
      }); 
      remove(ref(this.database, 'delivery/' + this.confirmid));
alert('done')
this.nav = true
this.Dactive = true
this.deliveredavtive = false
      }else if (pmethod == "gcash"){
        console.log(this.wgcash)
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
        gcash:this.cgcash + 1,
         currentday: dailysalee,
         cash:this.ccash
       
         
           
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  gcash:this.wgcash + 1,
  cash:this.wcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  gcash:this.ygcash + 1,
  cash:this.ycash
     
       
        }); 
        remove(ref(this.database, 'delivery/' + this.confirmid));
alert('done')
this.nav = true
this.Dactive = true
this.deliveredavtive = false
      }
  }
  

  changedelivery(){
    this.changemode = !this.changemode;
    if(this.changemode == false){
      this.changedd = "Delivery to Address"
    }else{
      this.changedd = "Pick up at the shop"
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  async addlaundryy(value:any){
    let pstatus 
    let pmethod
    if(this.paymentMethod == "unpaid"){
       pstatus = "unpaid"
       pmethod = "unpaid"
    }else if(this.paymentMethod == "gcash"){
       pstatus = "paid"
       pmethod = "gcash"
    }else if(this.paymentMethod == "cash"){
       pstatus = "paid"
       pmethod = "cash"
    }
    this.username = value.username
    const starCountRef = ref(this.database, 'client/' + this.username);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
      this.name = db.firstname + " "+db.lastname;
      this.location= db.address;
      this.uid = db.id;
      this.phonenumber = db.phonenumber
      this.username = db.username
  
     });
     await this.delay(1000);
   // calculation of pricing
   this.decimal = value.kilo/ this.defultkilo;
   if(this.decimal < 1){
     this.decimal = 1
   }
   this.decimal1 = Math.trunc(this.decimal);
   this.remover = this.decimal -  this.decimal1 
 if(this.remover != 0){
 this.pack = this.decimal1 + 1
 }else{
   this.pack = this.decimal1
 }
   this.total = this.pack * this.defultpricing;
   this.cpacks = value.packs
if(this.cpacks == 0 || this.cpacks ==  undefined){
  
}else{
  this.pack = this.cpacks
}
if(!value.kilo){
  alert("Put kilo")
}else{
  let times = formatDate(new Date(), 'hh:mma', 'en')
  let dates = formatDate(new Date(), 'MM~dd~yyyy', 'en')

     let myDate = formatDate(new Date(), 'mmss', 'en')
     this.uuid =  "L"+myDate+ Math.floor(100 + Math.random() * 99);
  set(ref(this.database, 'laundry/' + this.uuid), {
      id: this.uuid,
      username: this.username,
      name: this.name,
      address:this.location,
      for:this.changedd,
      phonenumber:this.phonenumber,
     uid: this.uid,
     total: this.total,
     pack: this.pack,
     kilo: value.kilo,
     status: "processing",
     paymentMethod:pmethod,
paymentStatus:pstatus,
time:times,
date: dates

     }); 


     const screenWidth = window.screen.width;
     const screenHeight = window.screen.height;
 
     // Create content for the print window
     const printContent = `
       <html>
         <head>
         <style>
         @page{
          size:45mm 50mm;
          
         }
         body{
       
          margin-left: -10px;
          size:45mm 50mm;
          text-align:center;
          height: 45mm;
          padding:10px;
          page-break-after:always;
         }
         .container {
          display: flex;
          justify-content: space-between;
        
      }
  
      .left {
          text-align: left;
      }
  
      .right {
          text-align: right;
      }
         </style>
           <title>Print Number</title>
         </head>
         <body>
         <br><br><hr style="border-top:1px white;"><br>
           <h3 class="to">IM CAFE & LAUNDROMAT</h1><br><br><hr><br>
           <h1>${this.uuid}</h1>
           <br><br><hr><br>
           <div class="container">
           <div class="left">
               <p>Name:</p>
               <p>Time:</p>
               <p>Date:</p>
               <p>Payment:</p>
               <p>Total:</p>
           </div>
           <div class="right">
               <p>John Lloyd</p>
               <p>3:04</p>
               <p>10~19~2023</p>
               <p>paid</p>
               <p>4k</p>
           </div>
       </div>
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






searchs = true
seachname = ""
userlist!: Observable<any[]>;
onsearch(){
  this.searchs = true
}
offsearch(value: any){
  this.searchs = false
  this.seachname = value
}


pickedupgcash(){

  let pmethod = "gcash"

// temporarty funtion for now
const iaid = sessionStorage.getItem('id');
let myDate = formatDate(new Date(), 'mmss', 'en')
let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
let realtime = formatDate(new Date(), 'hh:mma', 'en')
this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
set(ref(this.database, 'logs/' + this.transacitonid), {
  transacitonid: this.transacitonid,
  pastid: this.confirmid,
  username: this.confirmusername,
  name: this.confirmname,
 uid: this.confirmuid,
 payed: this.confirmpayed,
 pack: this.confirmpack,
 transacby: iaid,
 time: realtime,
 date:realdate,
 type: "picked up",
 paymentMethod:"gcash"

 }); 
 const today = new Date();
 const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
 const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
 const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
       // Remove the currency symbol '₱' and the decimal point '.'
       const amountWithoutCurrency = this.confirmpayed.substring(1);
    
       // Convert to an integer
       this.amountInInteger = parseInt(amountWithoutCurrency);

      //  daily 

      if(pmethod == "cash"){
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
      set(ref(this.database, 'sales/daily/' + dailysalee), {
       income: this.currentincomedaily + this.amountInInteger,
       sales:  this.currentsaledaily + 1,
       currentday: dailysalee,
       cash:this.ccash + 1,
        gcash:this.ccash
          }); 

 this.currentweek =  currentWeekNumber ;
 set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + this.amountInInteger,
sales:  this.currentsaleweek + 1,
currentWeekNumber: currentWeekNumber,
cash:this.wcash + 1,
gcash:this.wgcash
 
  }); 
  const ttoday = new Date();
  let tttodate = ttoday.getFullYear();
  this.currentyear = tttodate + 0
  set(ref(this.database, 'sales/year/' + this.currentyear), {
   income: this.currentincomeyear + this.amountInInteger,
   sales:  this.currentsaleyear + 1,
   currentyear: this.currentyear,
cash:this.ycash + 1,
gcash:this.ygcash
   
     
      }); 
      remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }else if (pmethod == "gcash"){
        console.log(this.wgcash)
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
        gcash:this.cgcash + 1,
         currentday: dailysalee,
         cash:this.ccash
       
         
           
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  gcash:this.wgcash + 1,
  cash:this.wcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  gcash:this.ygcash + 1,
  cash:this.ycash
     
       
        }); 
        remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }



}
pickedupcash(){

  let pmethod = "cash"

// temporarty funtion for now
const iaid = sessionStorage.getItem('id');
let myDate = formatDate(new Date(), 'mmss', 'en')
let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
let realtime = formatDate(new Date(), 'hh:mma', 'en')
this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
set(ref(this.database, 'logs/' + this.transacitonid), {
  transacitonid: this.transacitonid,
  pastid: this.confirmid,
  username: this.confirmusername,
  name: this.confirmname,
 uid: this.confirmuid,
 payed: this.confirmpayed,
 pack: this.confirmpack,
 transacby: iaid,
 time: realtime,
 date:realdate,
 type: "picked up",
 paymentMethod:"cash"

 }); 
 const today = new Date();
 const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
 const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
 const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
       // Remove the currency symbol '₱' and the decimal point '.'
       const amountWithoutCurrency = this.confirmpayed.substring(1);
    
       // Convert to an integer
       this.amountInInteger = parseInt(amountWithoutCurrency);

      //  daily 

      if(pmethod == "cash"){
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
      set(ref(this.database, 'sales/daily/' + dailysalee), {
       income: this.currentincomedaily + this.amountInInteger,
       sales:  this.currentsaledaily + 1,
       currentday: dailysalee,
       cash:this.ccash + 1,
        gcash:this.ccash
          }); 

 this.currentweek =  currentWeekNumber ;
 set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + this.amountInInteger,
sales:  this.currentsaleweek + 1,
currentWeekNumber: currentWeekNumber,
cash:this.wcash + 1,
gcash:this.wgcash
 
  }); 
  const ttoday = new Date();
  let tttodate = ttoday.getFullYear();
  this.currentyear = tttodate + 0
  set(ref(this.database, 'sales/year/' + this.currentyear), {
   income: this.currentincomeyear + this.amountInInteger,
   sales:  this.currentsaleyear + 1,
   currentyear: this.currentyear,
cash:this.ycash + 1,
gcash:this.ygcash
   
     
      }); 
      remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }else if (pmethod == "gcash"){
        console.log(this.wgcash)
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
        gcash:this.cgcash + 1,
         currentday: dailysalee,
         cash:this.ccash
       
         
           
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  gcash:this.wgcash + 1,
  cash:this.wcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  gcash:this.ygcash + 1,
  cash:this.ycash
     
       
        }); 
        remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }



}
deliverycash(){

  let pmethod = "cash"
   
  const iaid = sessionStorage.getItem('id');
  let myDate = formatDate(new Date(), 'mmss', 'en')
  let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
  let realtime = formatDate(new Date(), 'hh:mma', 'en')
  this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
  set(ref(this.database, 'logs/' + this.transacitonid), {
    transacitonid: this.transacitonid,
    pastid: this.confirmid,
    username: this.confirmusername,
    name: this.confirmname,
   uid: this.confirmuid,
   payed: this.confirmpayed,
   pack: this.confirmpack,
   transacby: iaid,
   time: realtime,
   date:realdate,
   type: "delivered",
   deliveredTo:this.confirmaddress,
   paymentMethod:pmethod

  
   }); 
   const today = new Date();
   const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
   const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
   const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
 
   this.currentweek =  currentWeekNumber ;
       // Remove the currency symbol '₱' and the decimal point '.'
       const amountWithoutCurrency = this.confirmpayed.substring(1);
    
       // Convert to an integer
       this.amountInInteger = parseInt(amountWithoutCurrency);
   
    //  daily 
    if(pmethod == "cash"){
      let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
      set(ref(this.database, 'sales/daily/' + dailysalee), {
       income: this.currentincomedaily + this.amountInInteger,
       sales:  this.currentsaledaily + 1,
       currentday: dailysalee,
       cash:this.ccash + 1,
        gcash:this.ccash
          }); 

 this.currentweek =  currentWeekNumber ;
 set(ref(this.database, 'sales/week/' + currentWeekNumber), {
income: this.currentincomeweek + this.amountInInteger,
sales:  this.currentsaleweek + 1,
currentWeekNumber: currentWeekNumber,
cash:this.wcash + 1,
gcash:this.wgcash
 
  }); 
  const ttoday = new Date();
  let tttodate = ttoday.getFullYear();
  this.currentyear = tttodate + 0
  set(ref(this.database, 'sales/year/' + this.currentyear), {
   income: this.currentincomeyear + this.amountInInteger,
   sales:  this.currentsaleyear + 1,
   currentyear: this.currentyear,
cash:this.ycash + 1,
gcash:this.ygcash
   
     
      }); 
      remove(ref(this.database, 'delivery/' + this.confirmid));
alert('done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false
      }else if (pmethod == "gcash"){
        console.log(this.wgcash)
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
        gcash:this.cgcash + 1,
         currentday: dailysalee,
         cash:this.ccash
       
         
           
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  gcash:this.wgcash + 1,
  cash:this.wcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  gcash:this.ygcash + 1,
  cash:this.ycash
     
       
        }); 
        remove(ref(this.database, 'delivery/' + this.confirmid));
alert('done')
this.nav = true
this.Dactive = true
this.deliveredavtive = false
      }
  }
  dcash(){

    let pmethod = "cash"
   
    const iaid = sessionStorage.getItem('id');
    let myDate = formatDate(new Date(), 'mmss', 'en')
    let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
    let realtime = formatDate(new Date(), 'hh:mma', 'en')
    this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
    set(ref(this.database, 'logs/' + this.transacitonid), {
      transacitonid: this.transacitonid,
      pastid: this.confirmid,
      username: this.confirmusername,
      name: this.confirmname,
     uid: this.confirmuid,
     payed: this.confirmpayed,
     pack: this.confirmpack,
     transacby: iaid,
     time: realtime,
     date:realdate,
     type: "delivered",
     deliveredTo:this.confirmaddress,
     paymentMethod:pmethod
  
    
     }); 
     const today = new Date();
     const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
     const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
     const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
   
     this.currentweek =  currentWeekNumber ;
         // Remove the currency symbol '₱' and the decimal point '.'
         const amountWithoutCurrency = this.confirmpayed.substring(1);
      
         // Convert to an integer
         this.amountInInteger = parseInt(amountWithoutCurrency);
     
      //  daily 
      if(pmethod == "cash"){
        let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
        set(ref(this.database, 'sales/daily/' + dailysalee), {
         income: this.currentincomedaily + this.amountInInteger,
         sales:  this.currentsaledaily + 1,
         currentday: dailysalee,
         cash:this.ccash + 1,
          gcash:this.ccash
            }); 
  
   this.currentweek =  currentWeekNumber ;
   set(ref(this.database, 'sales/week/' + currentWeekNumber), {
  income: this.currentincomeweek + this.amountInInteger,
  sales:  this.currentsaleweek + 1,
  currentWeekNumber: currentWeekNumber,
  cash:this.wcash + 1,
  gcash:this.wgcash
   
    }); 
    const ttoday = new Date();
    let tttodate = ttoday.getFullYear();
    this.currentyear = tttodate + 0
    set(ref(this.database, 'sales/year/' + this.currentyear), {
     income: this.currentincomeyear + this.amountInInteger,
     sales:  this.currentsaleyear + 1,
     currentyear: this.currentyear,
  cash:this.ycash + 1,
  gcash:this.ygcash
     
       
        }); 
        remove(ref(this.database, 'delivery/' + this.confirmid));
  alert('done')
  this.nav = true
  this.Dactive = true
  this.deliveredavtive = false
        }else if (pmethod == "gcash"){
          console.log(this.wgcash)
          let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
          set(ref(this.database, 'sales/daily/' + dailysalee), {
           income: this.currentincomedaily + this.amountInInteger,
           sales:  this.currentsaledaily + 1,
          gcash:this.cgcash + 1,
           currentday: dailysalee,
           cash:this.ccash
         
           
             
              }); 
    
     this.currentweek =  currentWeekNumber ;
     set(ref(this.database, 'sales/week/' + currentWeekNumber), {
    income: this.currentincomeweek + this.amountInInteger,
    sales:  this.currentsaleweek + 1,
    currentWeekNumber: currentWeekNumber,
    gcash:this.wgcash + 1,
    cash:this.wcash
     
      }); 
      const ttoday = new Date();
      let tttodate = ttoday.getFullYear();
      this.currentyear = tttodate + 0
      set(ref(this.database, 'sales/year/' + this.currentyear), {
       income: this.currentincomeyear + this.amountInInteger,
       sales:  this.currentsaleyear + 1,
       currentyear: this.currentyear,
    gcash:this.ygcash + 1,
    cash:this.ycash
       
         
          }); 
          remove(ref(this.database, 'delivery/' + this.confirmid));
  alert('done')

    this.nav = true
    this.Dactive = true
    this.deliveredavtive = false

        }
    }
    deliverygcash(){

      let pmethod = "gcash"
     
      const iaid = sessionStorage.getItem('id');
      let myDate = formatDate(new Date(), 'mmss', 'en')
      let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
      let realtime = formatDate(new Date(), 'hh:mma', 'en')
      this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 90);
      set(ref(this.database, 'logs/' + this.transacitonid), {
        transacitonid: this.transacitonid,
        pastid: this.confirmid,
        username: this.confirmusername,
        name: this.confirmname,
       uid: this.confirmuid,
       payed: this.confirmpayed,
       pack: this.confirmpack,
       transacby: iaid,
       time: realtime,
       date:realdate,
       type: "delivered",
       deliveredTo:this.confirmaddress,
       paymentMethod:pmethod
    
      
       }); 
       const today = new Date();
       const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
       const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
       const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
     
       this.currentweek =  currentWeekNumber ;
           // Remove the currency symbol '₱' and the decimal point '.'
           const amountWithoutCurrency = this.confirmpayed.substring(1);
        
           // Convert to an integer
           this.amountInInteger = parseInt(amountWithoutCurrency);
       
        //  daily 
        if(pmethod == "cash"){
          let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
          set(ref(this.database, 'sales/daily/' + dailysalee), {
           income: this.currentincomedaily + this.amountInInteger,
           sales:  this.currentsaledaily + 1,
           currentday: dailysalee,
           cash:this.ccash + 1,
            gcash:this.ccash
              }); 
    
     this.currentweek =  currentWeekNumber ;
     set(ref(this.database, 'sales/week/' + currentWeekNumber), {
    income: this.currentincomeweek + this.amountInInteger,
    sales:  this.currentsaleweek + 1,
    currentWeekNumber: currentWeekNumber,
    cash:this.wcash + 1,
    gcash:this.wgcash
     
      }); 
      const ttoday = new Date();
      let tttodate = ttoday.getFullYear();
      this.currentyear = tttodate + 0
      set(ref(this.database, 'sales/year/' + this.currentyear), {
       income: this.currentincomeyear + this.amountInInteger,
       sales:  this.currentsaleyear + 1,
       currentyear: this.currentyear,
    cash:this.ycash + 1,
    gcash:this.ygcash
       
         
          }); 
          remove(ref(this.database, 'delivery/' + this.confirmid));
    alert('done')
    this.nav = true
    this.Dactive = true
    this.deliveredavtive = false
          }else if (pmethod == "gcash"){
            console.log(this.wgcash)
            let dailysalee = formatDate(new Date(), 'MM~dd~yyyy', 'en')
            set(ref(this.database, 'sales/daily/' + dailysalee), {
             income: this.currentincomedaily + this.amountInInteger,
             sales:  this.currentsaledaily + 1,
            gcash:this.cgcash + 1,
             currentday: dailysalee,
             cash:this.ccash
           
             
               
                }); 
      
       this.currentweek =  currentWeekNumber ;
       set(ref(this.database, 'sales/week/' + currentWeekNumber), {
      income: this.currentincomeweek + this.amountInInteger,
      sales:  this.currentsaleweek + 1,
      currentWeekNumber: currentWeekNumber,
      gcash:this.wgcash + 1,
      cash:this.wcash
       
        }); 
        const ttoday = new Date();
        let tttodate = ttoday.getFullYear();
        this.currentyear = tttodate + 0
        set(ref(this.database, 'sales/year/' + this.currentyear), {
         income: this.currentincomeyear + this.amountInInteger,
         sales:  this.currentsaleyear + 1,
         currentyear: this.currentyear,
      gcash:this.ygcash + 1,
      cash:this.ycash
         
           
            }); 
            remove(ref(this.database, 'delivery/' + this.confirmid));
    alert('done')
  
    this.nav = true
    this.Dactive = true
    this.deliveredavtive = false
  
          }
      }
      

}
