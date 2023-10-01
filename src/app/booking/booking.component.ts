import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, set } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
name=""
location=""
uid=""
time=""
phonenumber=""
username=""
email=""
readlocation = true
readphonenumber = true
changedd="Delivery to Address"
changemode=false
max="11"
min="2"
heroForm: any;
iid= sessionStorage.getItem('id');
  checker=""
  uuid=""
 packs = 0  
  constructor(public database:Database,public router:Router) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue == "0" ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
    const id= sessionStorage.getItem('id');
    const starCountRef = ref(this.database, 'client/' + id);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
      this.name = db.firstname + " "+db.lastname;
      this.location= db.address;
      this.uid = db.id;
      this.phonenumber = db.phonenumber;
      this.email = db.email;
      this.username = db.username

     });
   }

  ngOnInit(): void {

  }
  //allowing to edit location
  changelocation(){
    this.readlocation = !this.readlocation;
  }
    //allowing to edit phonenumber
  changephonenumber(){
    this.readphonenumber = !this.readphonenumber;
  }
  changedelivery(){
    this.changemode = !this.changemode;
    if(this.changemode == false){
      this.changedd = "Delivery to Address"
    }else{
      this.changedd = "Pick up at the shop"
    }
  }
//deleying the funtion
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
//booking
  async book(value:any){
   if(value.packs){
    this.packs = value.packs
   }  
  const starCountRef = ref(this.database, 'pickup/' + this.iid);
  onValue(starCountRef, (snapshot) => {
    const ad = snapshot.val();  
    this.checker = ad.username
   }); 
     await this.delay(1000);
console.log(this.checker)  
    if(this.checker == this.iid  ){
     alert('You already booked!');  
    }     
    else {  
      let myDate = formatDate(new Date(), 'mmss', 'en')
      this.uuid =  "p"+myDate+ Math.floor(100 + Math.random() * 90);
   set(ref(this.database, 'pickup/' + this.uuid), {
       id: this.uuid,
       username: this.username,
       name: value.name,
       address:value.location,
       for:value.changedd,
       phonenumber:value.phonenumber,
      uid: this.uid,
      cpack:this.packs
      }); 
      this.checker = "";
    this.packs = 0
      alert('Booked!');
    }
  }
  
}
