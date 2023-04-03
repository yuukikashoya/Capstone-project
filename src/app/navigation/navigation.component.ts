import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
admin = true;
session= false;


  constructor(private router:Router) {
    const id= sessionStorage.getItem('id');
    if(id == null){
      this.session = false;
    }else{
      this.session = true;
    }


    
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
