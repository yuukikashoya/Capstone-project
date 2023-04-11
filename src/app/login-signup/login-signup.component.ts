import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database,set,ref,onValue } from '@angular/fire/database';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  uuid = "";
  checker = "";
  checker1 = "";
  password = "";
  cpassword = "";

  constructor(private router:Router,public database:Database) { }

  ngOnInit(): void {
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
login(value:any){
  sessionStorage.setItem('id',value.username);
  this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });

}

  async signup(value:any){

  this.password = value.password;
  this.cpassword = value.cpassword;
  const starCountRef = ref(this.database, 'staff/' + value.username);
  onValue(starCountRef, (snapshot) => {
   const ad = snapshot.val();  
this.checker = ad.username

   }); 

    const starCountRef1 = ref(this.database, 'client/' + value.username);
    onValue(starCountRef1, (snapshot) => {
     const cli = snapshot.val();  
  this.checker1 = cli.username

     }); 
   if (this.password != this.cpassword){

    alert('Password Dint match ');
   }else{
    await this.delay(1000);
    if(this.checker == value.username || this.checker1 == value.username ){
     alert('user email already exist!'); 
     console.log(this.checker," and ",this.checker1)
    }

      
    else {
    
       console.log("test1")
       this.uuid = "client" +Math.floor(100000 + Math.random() * 900000);
   set(ref(this.database, 'client/' + value.username), {
       id: this.uuid,
       username: value.username,
       password: value.password,
       firstname: value.fname,
       lastname: value.lname,
       Email: value.email,
       gender: value.set,
      address: value.address,
       phonenumber: value.phonenumber,
       activity: false


      }); 
      this.checker = "";
      this.checker1 = "";
      this.password = "";
      this.cpassword = "";
      alert('account created!');
      this.router.navigate(['/login'])
    }
   }
   
}
}

