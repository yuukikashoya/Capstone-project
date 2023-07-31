import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
   eid = sessionStorage.getItem('id');
pickup!: Observable<any[]>;
laundry!: Observable<any[]>;
delivery!: Observable<any[]>;
customerpickup!: Observable<any[]>;
  constructor(public router:Router,private FireDb: AngularFireDatabase) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue ) {
      this.pickup = FireDb.list('/pickup').valueChanges();
      this.laundry = FireDb.list('/laundry').valueChanges();
      this.delivery = FireDb.list('/delivery').valueChanges();
      this.customerpickup = FireDb.list('/customerpickup').valueChanges();
    } else {
      this.router.navigate(['/sign'])
    }
  }

  ngOnInit(): void {
  }

}
