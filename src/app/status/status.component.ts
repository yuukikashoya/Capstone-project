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
  DeliveryPickupA = true
  processingA = false
  wasingA = false
  ReadyD = false
  ReadyP = false

  DeliveryPickup() {
    this.DeliveryPickupA = true
    this.processingA = false
    this.wasingA = false
    this.ReadyD = false
    this.ReadyP = false
  }
  processing() {
    this.DeliveryPickupA = false
    this.processingA = true
    this.wasingA = false
    this.ReadyD = false
    this.ReadyP = false
  }
  wasing() {
    this.DeliveryPickupA = false
    this.processingA = false
    this.wasingA = true
    this.ReadyD = false
    this.ReadyP = false
  }
  Readydd() {
    this.DeliveryPickupA = false
    this.processingA = false
    this.wasingA = false
    this.ReadyD = true
    this.ReadyP = false
  }
  Readypp() {
    this.DeliveryPickupA = false
    this.processingA = false
    this.wasingA = false
    this.ReadyD = false
    this.ReadyP = true
  }
}
