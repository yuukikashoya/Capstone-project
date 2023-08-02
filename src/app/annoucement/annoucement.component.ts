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
  editid=""
  editac = false
getedit(value:any){
this.editac = true
this.editid = value.postid
this.body = value.body
this.header = value.body
}
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
editcancel(){
  this.editac = false
  this.myForm.reset(); 
}
deletea(value:any){
  remove(ref(this.database,   'announcements/' + value));
}
  
}
