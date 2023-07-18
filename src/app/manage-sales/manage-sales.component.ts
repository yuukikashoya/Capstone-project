import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

  constructor(public router:Router) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue == "1" ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }

}
