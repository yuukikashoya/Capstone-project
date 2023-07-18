import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  constructor(public router:Router) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
  }
  ngOnInit(): void {
  }

}
