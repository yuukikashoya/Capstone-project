import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats!: Observable<any[]>;
  iid= sessionStorage.getItem('id');
  admin = false
  constructor(public database:Database,private FireDb: AngularFireDatabase) {
    this.chats = FireDb.list('/chat/'+ this.iid).valueChanges();

   }

  ngOnInit(): void {
  }
  chatid =1
  chat = ""
chatcount=0

sendchat(value:any){

  if(value.chat == null || value.chat == "" || value.chat == undefined){
  alert("wala")
 }else{
  
  const date = new Date();
  
  
  set(ref(this.database, 'chat/' + this.iid + '/'+date), {
  usderid: this.iid,
  time:  date,
  chat: value.chat,
  admin: this.admin



 });
this.chat = ""

 }
}
}