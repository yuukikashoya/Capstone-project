import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { NavigationEnd, Router } from '@angular/router';
import { onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
admin = false;
session= false;
staff = false;

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}



  constructor(private router:Router,public database:Database) {
    const id= sessionStorage.getItem('id');
    const starCountRef = ref(this.database, 'staff/' + id);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.staff = db.staff;
 this.session = this.staff;
 this.admin = this.admin;

     });
     
 
  const starCountRef1 = ref(this.database, 'client/' + id);
         onValue(starCountRef1, (snapshot) => {
          const cd = snapshot.val();  
          if(cd.username == id){
  this.session = true;
  }
          });
     
 






    // const id= sessionStorage.getItem('id');
    // if(id == null){
    //   this.session = false;
    // }else{
    //   this.session = true;
    // }


    
   }

  ngOnInit(): void {


  }
logout(){
  sessionStorage.clear();
  this.router.navigate(['/sign'])
  .then(() => {
    window.location.reload();
  });
}
}
