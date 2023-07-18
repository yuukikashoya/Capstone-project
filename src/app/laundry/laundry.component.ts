import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, remove, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';

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



  constructor(private FireDb: AngularFireDatabase, public database:Database,public router:Router) { 

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue == "1" ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
      this.pickup = FireDb.list('/pickup').valueChanges();
      this.laundry = FireDb.list('/laundry').valueChanges();
      this.deliverylist = FireDb.list('/delivery').valueChanges();
      this.customerpickuplist = FireDb.list('/customerpickup').valueChanges();

  }

  ngOnInit(): void {
  }
upid = ""
upusername = ""
upname = ""
upuid = ""
upphonenumber = ""
upadress= ""
upfor = ""


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
    this.PKactive =  true;
    this.PUactive = false;
  }

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
  defultkilo = 7
  defultpricing = 150
  decimal = 0
  pack = 0
  total = 0
  remover = 0
  decimal1 = 0
  uuid = ""
 
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
// adding to the database
let myDate = formatDate(new Date(), 'yyyyMMddhhmmss', 'en')
this.uuid =  "laundry"+myDate+ Math.floor(100 + Math.random() * 900000);
set(ref(this.database, 'laundry/' + this.uuid), {
    id: this.uuid,
    username: value.username,
    name: value.name,
    address:value.address,
    for:value.to,
    phonenumber:value.phonenumber,
   uid: value.userid,
   total: this.total,
   pack: this.pack,
   kilo: value.kilo,
   status: "processing"



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




PKactive = true;
Dactive = false;
Wactive = false;
Pickupactive = false;
PUactive = false;
WUactive = false;
CPKactive = false;


showPK(){
  this.PKactive =  true;
  this.Dactive = false;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
}
showD(){
  this.PKactive =  false;
  this.Dactive = true;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
}
showW(): void{
  this.PKactive =  false;
  this.Dactive = false;
  this.Wactive = true;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = false;
  this.CPKactive = false;
}
showpick(){
  this.PKactive =  false;
  this.Dactive = false;
  this.Wactive = false;
  this.PUactive = false;
  this.WUactive = false;
  this.Pickupactive = true;
  this.CPKactive = false;
}


updatewashing(){
  update(ref(this.database, 'laundry/' + this.laid), {

   status: "washing"



   }); 
   this.Wactive =  true;
   this.WUactive = false;

}

readyfordelivery(){
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
   status: "On the Delivery"



   }); 


   this.Wactive =  true;
   this.WUactive = false;

}
readyforpickup(){
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
   status: "Ready for Pick up"
   }); 


   this.Wactive =  true;
   this.WUactive = false;

}

// finish  or delete
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

}
transacitonid = ""
pickedupyes(){
// temporarty funtion for now
const iaid = sessionStorage.getItem('id');
let myDate = formatDate(new Date(), 'yyyyMMddhhmmss', 'en')
let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
let realtime = formatDate(new Date(), 'hh:mma', 'en')
this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 900000);
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
 type: "picked up"

 }); 
remove(ref(this.database, 'customerpickup/' + this.confirmid));
alert('temporary done')
this.nav = true
this.Pickupactive = true
this.pickedactive = false

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
  const iaid = sessionStorage.getItem('id');
  let myDate = formatDate(new Date(), 'yyyyMMddhhmmss', 'en')
  let realdate = formatDate(new Date(), 'MM/dd/yyyy', 'en')
  let realtime = formatDate(new Date(), 'hh:mma', 'en')
  this.transacitonid =  "log"+myDate+ Math.floor(100 + Math.random() * 900000);
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
   deliveredTo:this.confirmaddress

  
   }); 
  remove(ref(this.database, 'delivery/' + this.confirmid));
  alert('temporary done')
  this.nav = true
this.Dactive = true
this.deliveredavtive = false
  
  }
  

}



