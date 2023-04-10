import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database,set,ref,onValue } from '@angular/fire/database';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  checker = "";
  uuid = "";


  constructor(private router:Router,public database:Database) { }

  ngOnInit(): void {
  }
login(value:any){
  sessionStorage.setItem('id',value.username);
  this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });

}
pang=false;
signup(value:any){
  const starCountRef = ref(this.database, 'accounts/' + value.email);
  onValue(starCountRef, (snapshot) => {
   const db = snapshot.val();  
this.checker = db.username

   }); 

    
   if (this.pang == true){

    alert('Fill the form ');
   }else{
    if(this.checker == value.email){
     alert('user email already exist!'); 
    }

      
    else {

      this.uuid = "staff" +Math.floor(100000 + Math.random() * 900000);
  set(ref(this.database, 'staff/' + value.username), {
      id: this.uuid,
      username: value.username,
      password: value.password,
      firstname: value.fname,
      lastname: value.lname,
      Email: "",
      gender: "male",
      phonenumber: value.phonenumber,
      jobtitle: "owner",
      admin: true,
      rootadmin: true,
      activity: false


     }); 
     alert('account created!');
     this.router.navigate(['/login'])
    }
   }
   
}
}

