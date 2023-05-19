import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {
  pickup!: Observable<any[]>;
  constructor(private FireDb: AngularFireDatabase) { 
      this.pickup = FireDb.list('/pickup').valueChanges();

  }

  ngOnInit(): void {
  }

}
