import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, set } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
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
  constructor(public database:Database) {
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
  changelocation(){
    this.readlocation = !this.readlocation;
  }
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
  checker=""
  uuid=""
 
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async book(value:any){

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
    
      let myDate = formatDate(new Date(), 'yyyyMMddhhmmss', 'en')
      this.uuid =  "laundry"+myDate+ Math.floor(100 + Math.random() * 900000);
   set(ref(this.database, 'pickup/' + this.uuid), {
       id: this.uuid,
       username: this.username,
       name: value.name,
       address:value.location,
       for:value.changedd,
       phonenumber:value.phonenumber,
      uid: this.uid



      }); 
      this.checker = "";
    
     
      alert('Booked!');
 

    }
   
   

  }
  
}
