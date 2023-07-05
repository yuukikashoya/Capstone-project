import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, remove, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  account!: Observable<any[]>;
  client!: Observable<any[]>;
  constructor(private FireDb: AngularFireDatabase,public database:Database) {
    this.account = FireDb.list('/staff').valueChanges();
        this.client = FireDb.list('/client').valueChanges();
   }

  ngOnInit(): void {
  }
  checker = ""
  checker1 = ""
  defultpassword = "1"
  iid= sessionStorage.getItem('id');
  uuid = ""
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


  async admin(value:any){
    if (  value.username == null || value.username == "" || value.password == null || value.password == "" 
    || value.fname == null || value.fname == ""
    ||  value.lname == null || value.lname == "" ||  value.email == null || value.email == ""
    ||  value.set == null || value.set == ""  
    ||  value.phonenumber == null || value.phonenumber == "" ||  value.role == null || value.role == ""
    
    ){
      console.log(value.password)
      alert('Fill the form');
    }else{
    const starCountRef = ref(this.database, 'staff/' + value.username);
    onValue(starCountRef, (snapshot) => {
    const ad = snapshot.val();  
    this.checker = ad.username
    
    }); 
    const starCountRef1 = ref(this.database, 'client/' + value.username);
    onValue(starCountRef1, (snapshot) => {
    const ac = snapshot.val();  
    this.checker1 = ac.username
    
    }); 
     await this.delay(1000);
    
    
    if(this.checker == value.username || this.checker1 == value.username ){
     alert('Username Already Exist!'); 
    
    }
    
      
    else {
    
       this.uuid = "staff" +Math.floor(100000 + Math.random() * 900000);
       set(ref(this.database, 'staff/' + value.username), {
           id: this.uuid,
           username: value.username,
           password: value.password,
           firstname: value.fname,
           lastname: value.lname,
           Email: value.email,
           gender: value.set,

           phonenumber: value.phonenumber,
           activity: false,
           jobtitle: value.role,
           rootadmin:false,
           staff:true,
           admin:false
    
    
          }); 
    
    
    console.log(value.password)
     
      alert("staff account created");
    
    
    }
    }
    
}

ADDactive = true
staffactive = false
cleintactive = false
showAddStaff(){
  this.ADDactive =  true;
  this.staffactive = false;
  this.cleintactive = false;
  this.editstuff = false

}
showStaff(){
  this.ADDactive =  false;
  this.staffactive = true;
  this.cleintactive = false;
  this.editstuff = false
}
showclient(){
  this.ADDactive =  false;
  this.staffactive = false;
  this.cleintactive = true; 
  this.editstuff = false
}



// edit staff
usfirstname = ""
uslastname = ""
usphonenumber = ""
usemail = ""
usgender = "male"
usnamejobtitle = "staff"
ususername = ""
modea = false
modeb = false

getstuff(value:any){
  if(value.jobtitle == "administrator" || value.jobtitle == "owner"){
    alert("you cant edit a admin or owner")
  }else{
    this.editstuff = true
  this.usfirstname = value.firstname
  this.uslastname = value.lastname
  this.usphonenumber = value.phonenumber
  this.usemail = value.Email
  this.usgender = value.gender
  this.usnamejobtitle = value.jobtitle
  this.ususername = value.username
  this.staffactive = false;
  if(value.gender == "male"){
    this.modeb = false
  }else{
    this.modeb = true
  }
  if(value.gender == "Staff"){
    this.modeb = false
  }else{
    this.modeb = true
  }
}
}
changejob(){
  this.modea = !this.modea;
  if(this.modea == false){
    this.usnamejobtitle = "Staff"
  }else{
    this.usnamejobtitle = "Delivery"
  }
}
changegender(){
  this.modeb = !this.modeb;
  if(this.modeb == false){
    this.usgender = "male"
  }else{
    this.usgender = "female"
  }
}
editstuff = false
backupdatestaff(){
  this.ADDactive =  false;
  this.staffactive = true;
  this.cleintactive = false;
  this.usfirstname = ''
  this.uslastname = ''
  this.usphonenumber = ''
  this.usemail = ''
  this.ususername =''
  this.editstuff = false
}
deletestaff(){
  remove(ref(this.database,  'staff/' + this.ususername));
  this.ADDactive =  false;
  this.staffactive = true;
  this.cleintactive = false;
  this.usfirstname = ''
  this.uslastname = ''
  this.usphonenumber = ''
  this.usemail = ''
  this.ususername =''
  this.editstuff = false

}

updatestaff(){

update(ref(this.database, 'staff/' + this.ususername), {


  firstname:  this.usfirstname,
  lastname: this.uslastname,
  Email: this.usemail,
  gender: this.usgender,
  phonenumber: this.usphonenumber,
  jobtitle: this.usnamejobtitle,


  }); 
  alert("user updated")
  this.ADDactive =  false;
  this.staffactive = true;
  this.cleintactive = false;
  this.usfirstname = ''
  this.uslastname = ''
  this.usphonenumber = ''
  this.usemail = ''
  this.ususername =''
  this.editstuff = false

}
}
