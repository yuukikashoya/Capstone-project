import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  username = sessionStorage.getItem('id');
  sessionValue = sessionStorage.getItem('type');
  constructor() {

   }

  ngOnInit(): void {
  }

}
