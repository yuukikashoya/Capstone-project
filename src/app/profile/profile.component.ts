import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   type = sessionStorage.getItem('type');
  constructor(public router:Router ,public database:Database) {
    const id= sessionStorage.getItem('id');
    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue ) {
    
      if (sessionValue == "1") {
    
        const starCountRef = ref(this.database, 'staff/' + id);
   onValue(starCountRef, (snapshot) => {
    const db = snapshot.val();  
// get the value of the staff

    });


   }else if(sessionValue == "0"){

 const starCountRef1 = ref(this.database, 'client/' + id);
        onValue(starCountRef1, (snapshot) => {
         const cd = snapshot.val();  
// get the value of client
         });

   }
   
   else {
   
   } 

    


    } else {
      this.router.navigate(['/sign'])
    } 
  }
  ngOnInit(): void {
  }

}
