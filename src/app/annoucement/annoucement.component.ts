import { formatDate } from '@angular/common';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, remove, set, update } from '@angular/fire/database';
import { FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.component.html',
  styleUrls: ['./annoucement.component.css']
})
export class AnnoucementComponent implements OnInit {
  announcements!: Observable<any[]>;
  @ViewChild('postaaa') myForm!: NgForm;
   eid = sessionStorage.getItem('id');
typeid = sessionStorage.getItem('type');
  constructor(public database:Database,private FireDb: AngularFireDatabase,public router:Router) {
    const sessionValue = sessionStorage.getItem('type');
    const sid = sessionStorage.getItem('id');
    if (sessionValue) {
    
    } else {
      this.router.navigate(['/sign'])
    }
    this.announcements = FireDb.list('/announcements').valueChanges();

   }
postid= ""
header= ""
body= ""
todelete = ""
showDialog = false; 
editid=""
editac = false
//posting the announcement
  postna(any:any){
    this.header = any.header
    this.body = any.body

if(any.header && any.body){
    let myDate = formatDate(new Date(), 'yyyyMMddhhmmss', 'en')
    this.postid =  "post"+myDate+ Math.floor(100 + Math.random() * 900000);
    let timedate = formatDate(new Date(), 'hh:mma - MM/dd/yyyy', 'en')
 set(ref(this.database, 'announcements/' + this.postid), {
 title: this.header,
 body : this.body,
 timedate: timedate,
 postid:this.postid
    }); 
    alert("posted")
    this.myForm.reset(); 
  }
}
  ngOnInit(): void {
  }
//getting the id of the posted content
getedit(value:any){
this.editac = true
this.editid = value.postid
this.body = value.body
this.header = value.title
}
//editing the posted content
edit(){
  if(this.header && this.body){
  update(ref(this.database, 'announcements/' + this.editid), {
    title: this.header,
    body : this.body,
   
       }); 
       alert("updated")
       this.myForm.reset(); 
  this.editac = false
      }
}
//cancel or backing to the contents
editcancel(){
  this.editac = false
  this.myForm.reset(); 
}
//showing the confimation
deletea(value:any){
  this.showDialog = true;
  this.todelete = value
}
//deleting the content
onConfirmed(): void {
 remove(ref(this.database,   'announcements/' + this.todelete));
  this.showDialog = false;
}
//closing the dialog
onCancelled(): void {
 
  this.todelete = ''
  this.showDialog = false;
}
//showing the confimation
openConfirmationDialog(value:any): void {
  this.showDialog = true;
  this.todelete = value
}
}
