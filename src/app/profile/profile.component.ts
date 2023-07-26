import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref, update } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  namef=""
  namel=""
  location=""
  uid=""
  time=""
  phonenumber=""
  username=""
  email=""
  gender=""
  jobtitle = ""

   eid= sessionStorage.getItem('id');
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
      this.namef = db.firstname,
      this.namel = db.lastname,
      this.gender = db.gender,
      this.email = db.Email,
      this.phonenumber = db.phonenumber,
    this.jobtitle = db.jobtitle
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


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}




oldpassword!: string;
newpasword!: string;
confirmpassword!:string;
  // change password
   changepassword(value:any){
    if(this.oldpassword && this.newpasword && this.confirmpassword){
     let oldpassword = ""
     if (this.type == "1") {
     // staff change password
     const starCountRef = ref(this.database, 'staff/' + this.eid);
     onValue(starCountRef, (snapshot) => {
      const db = snapshot.val();  
      oldpassword = db.password

      });
    
 
 if(oldpassword == value.oldpassword){
       if(value.newpassword == value.confirmpassword){
         update(ref(this.database, 'staff/' + this.eid),{

           password:value.confirmpassword
           } );
           alert("password updated")
           this.oldpassword=""
           this.newpasword=""
           this.confirmpassword=""
       }else{
         alert('Please Confirm your password')
       }
 }else{
   alert(" old password dint match")
 }
  }else if(this.type == "0"){
 // userchange password

  }

   }else{
    alert("fill the form")
  }
}

  
}
