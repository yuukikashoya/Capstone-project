import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { NavigationEnd, Router } from '@angular/router';
import { onValue, ref, update } from 'firebase/database';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
admin = false;
session= false;
staff = false;
typeid :any;
navData: any;
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

reloadNavComponent() {
  const id= sessionStorage.getItem('id');
  const ara = sessionStorage.getItem('type');
this.typeid = ara
const starCountRef = ref(this.database, 'staff/' + id);
onValue(starCountRef, (snapshot) => {
 const db = snapshot.val();  
this.staff = db.staff;
this.admin = db.admin;

 });
}
  constructor(private router:Router,public database:Database, public navService:NavService) {
  const id= sessionStorage.getItem('id');

    const sessionValue = sessionStorage.getItem('type');
    this.typeid = sessionValue
    if (sessionValue == "1") {  
         const starCountRef = ref(this.database, 'staff/' + id);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.staff = db.staff;
 this.admin = db.admin;

     });
    }else if(sessionValue == "0"){
  const starCountRef1 = ref(this.database, 'client/' + id);
         onValue(starCountRef1, (snapshot) => {
          const cd = snapshot.val();  
          if(cd.username == id){
  this.session = true;
  }
          });

    }
    else {
    
    } 

    this.navService.reloadNav$.subscribe(() => {
      this.reloadNavComponent();
    });

   }

  ngOnInit(): void {

  }
  async logout(){
      const date = new Date();
    const id= sessionStorage.getItem('id');

  if(this.staff == true){
update(ref(this.database, 'staff/' + id),{
      last_login:date,
      activity:false
      } );
}else{
  update(ref(this.database, 'client/' + id),{
    last_login:date,
    activity:false
    } );
}
// await this.delay(1000);
this.admin = false;
this.staff = false;
sessionStorage.clear();
this.router.navigate(['/sign'])
this.navService.reloadNav();
}
}
