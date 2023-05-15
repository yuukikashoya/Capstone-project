import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  account!: Observable<any[]>;
  constructor(private FireDb: AngularFireDatabase,public database:Database) {
    this.account = FireDb.list('/staff').valueChanges();
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
}
