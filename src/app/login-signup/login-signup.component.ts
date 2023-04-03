import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
login(value:any){
  sessionStorage.setItem('id',value.email);
  this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });

}

}
