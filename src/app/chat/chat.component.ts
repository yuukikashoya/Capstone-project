import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, set, update } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats!: Observable<any[]>;
  chatlist!: Observable<any[]>;
  iid= sessionStorage.getItem('id');
  admin = false
  constructor(public database:Database,private FireDb: AngularFireDatabase) {
  

    const starCountRef = ref(this.database, 'staff/' + this.iid);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  

    this.admin = db.staff;

     } );
       
    console.log(this.admin)
      if(this.admin == true){
        this.chatlist = FireDb.list('/client').valueChanges();

      }else{
          this.chats = FireDb.list('/chat/'+ this.iid).valueChanges();
      }
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
  username: this.iid,
  time:  date,
  chat: value.chat,
  admin: this.admin

 });

this.chat = ""

 }
}
currentuserchat= ""
adminchat = false
getchat(value: any){
  this.chats = this.FireDb.list('/chat/'+ value.username).valueChanges();
  this.adminchat = true
  this.currentuserchat= value.username
}


adminsendchat(value:any){

  if(value.chat == null || value.chat == "" || value.chat == undefined){
  alert("wala")
 }else{
  
  const date = new Date();
  
  
  set(ref(this.database, 'chat/' + this.currentuserchat + '/'+date), {
  username: this.iid,
  time:  date,
  chat: value.chat,
  admin: this.admin

 });

this.chat = ""

 }
}
}