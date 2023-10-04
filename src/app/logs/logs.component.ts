import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Router } from '@angular/router';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs!: Observable<any[]>;
  
  constructor(private FireDb: AngularFireDatabase,public router:Router) { 
    const sessionValue = sessionStorage.getItem('type');
    const sid = sessionStorage.getItem('id');
    if (sessionValue == "1" && sid == "admin" || sid == "owner") {
    } else {
      this.router.navigate(['/sign'])
    }
    this.logs = FireDb.list('/logs').valueChanges();
  }

  ngOnInit(): void {
  }

}
