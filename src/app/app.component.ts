import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Capstone';

  constructor(private router:Router){
    const sessionValue = sessionStorage.getItem('id');

    if (sessionValue) {

    } else {
      this.router.navigate(['/sign'])
    }

  }
}
