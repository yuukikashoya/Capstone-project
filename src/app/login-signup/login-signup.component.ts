import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database,set,ref,onValue,update } from '@angular/fire/database';

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
  show: boolean = false;
  clientdata = "";
  staffdata="";
clientname = "";
staffname="";
log: boolean = false;

signlogin() {
  this.log = !this.log;

}

  showpassword() {
    this.show = !this.show;
}

  constructor(private router:Router,public database:Database) { }

  ngOnInit(): void {
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async login(value:any){
 if (  value.username == null || value.username == "" || value.password == null || value.password == "" 
   
  ){
    alert('Fill the form ');
   }else{
    //check in client table
   const starCountRefclient = ref(this.database, 'client/' + value.username);
onValue(starCountRefclient, (snapshot) => {
 const cd = snapshot.val();  
this.clientdata = cd.password;
this.clientname = cd.username;

 }); 
 const starCountRefstaff = ref(this.database, 'staff/' + value.username);
 onValue(starCountRefstaff, (snapshot) => {
  const sd = snapshot.val();  
 this.staffdata = sd.password;
 this.staffname = sd.username;
 
  }); 
 await this.delay(1000);

 if (this.clientdata == value.password){
  //client login
  const date = new Date();
update(ref(this.database, 'client/' + value.username),{
last_login:date,
activity:true
} );
sessionStorage.setItem('id',value.username);

this.router.navigate(['/home'])
.then(() => {
window.location.reload();
});
}else if(this.staffdata == value.password){
  //staff login
  const date = new Date();
  update(ref(this.database, 'staff/' + value.username),{
  last_login:date,
  activity:true
  } );
  sessionStorage.setItem('id',value.username);
  
  this.router.navigate(['/home'])
  .then(() => {
  window.location.reload();
  });
}else{
alert('wrong credential!');
}
}

}

  async signup(value:any){

    if (  value.username == null || value.username == "" || value.password == null || value.password == "" 
    ||  value.cpassword == null || value.cpassword == "" ||  value.fname == null || value.fname == ""
    ||  value.lname == null || value.lname == "" ||  value.email == null || value.email == ""
    ||  value.set == null || value.set == "" ||  value.address == null || value.address == ""
    ||  value.phonenumber == null || value.phonenumber == ""
    ){
      alert('Fill the form');
    }else{
  this.password = value.password;
  this.cpassword = value.cpassword;
      //check in staff table
  const starCountRef = ref(this.database, 'staff/' + value.username);
  onValue(starCountRef, (snapshot) => {
   const ad = snapshot.val();  
this.checker = ad.username

   }); 
    //check in client table
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
      this.log = !this.log;
      alert('account created!');
 

    }
   }
   
}
}
}
