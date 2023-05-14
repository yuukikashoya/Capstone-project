import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  account!: Observable<any[]>;
  constructor(private FireDb: AngularFireDatabase) {
    this.account = FireDb.list('/staff').valueChanges();
   }

  ngOnInit(): void {
  }

}
