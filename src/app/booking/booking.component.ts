import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
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
  book(value:any){

  }
  
}
