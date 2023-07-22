import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

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
