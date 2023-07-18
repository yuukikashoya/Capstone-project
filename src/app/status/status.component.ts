import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

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
