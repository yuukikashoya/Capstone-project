import { formatDate } from '@angular/common';
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref, set, update } from '@angular/fire/database';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatWindow', { static: false }) chatWindow!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatWindowElement = this.chatWindow.nativeElement;
    chatWindowElement.scrollTop = chatWindowElement.scrollHeight;
  }
  chats!: Observable<any[]>;
  chatlist!: Observable<any[]>;
  iid= sessionStorage.getItem('id');
  admin = false
  typeid = sessionStorage.getItem('type');
  chatid =1
  chat = ""
  chatcount=0
  listbox = true;
  chatbox = false;
  currentuserchat= ""
  adminchat = false
  constructor(public router:Router,public database:Database,private FireDb: AngularFireDatabase) {
      const sessionValue = sessionStorage.getItem('type'); 
      if (sessionValue ) {    
      } else {
        this.router.navigate(['/sign'])
      }

    const starCountRef = ref(this.database, 'staff/' + this.iid);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
    this.admin = db.staff;
     } );
      if(this.typeid == '1'){
        this.chatlist = FireDb.list('/client').valueChanges();
      }else{
          this.chats = FireDb.list('/chat/'+ this.iid).valueChanges();
      }
    }

  ngOnInit(): void {
  }
 
sendchat(value:any){
  if(value.chat == null || value.chat == "" || value.chat == undefined){
  alert("wala")
 }else{
  const date = formatDate(new Date(), 'YYYYddMMhhmmss', 'en')
  const datenow = formatDate(new Date(), ' hh:mma MMM/dd/YYYY', 'en')
  const superid = date + Math.floor(100 + Math.random() * 900000);
  set(ref(this.database, 'chat/' + this.iid + '/'+date), {
  username: this.iid,
  chat: value.chat,
  admin: false,
  timesent: datenow,
  id:date

 });
this.chat = ""
 }
}

getchat(value: any){
  this.chats = this.FireDb.list('/chat/'+ value.username).valueChanges();
  this.adminchat = true
  this.currentuserchat= value.username
  this.listbox = false
}

closechatbox(){
  this.adminchat = false
  this.currentuserchat= ""
  this.listbox = true
}

adminsendchat(value:any){
  if(value.chat == null || value.chat == "" || value.chat == undefined){
  alert("wala")
 }else{
  const date = formatDate(new Date(), 'YYYYddMMhhmmss', 'en')
  const datenow = formatDate(new Date(), ' hh:mma MMM/dd/YYYY', 'en')
  const superid = date + Math.floor(100 + Math.random() * 900000);
  set(ref(this.database, 'chat/' + this.currentuserchat + '/'+date), {
  username: this.iid,
  chat: value.chat,
  admin: this.admin,
  timesent: datenow,
  id:date
 });
this.chat = ""
 }
}
}