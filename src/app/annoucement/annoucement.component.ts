import { formatDate } from '@angular/common';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, set } from '@angular/fire/database';
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

  constructor(public database:Database,private FireDb: AngularFireDatabase,public router:Router) {
    const sessionValue = sessionStorage.getItem('type');
    const sid = sessionStorage.getItem('id');
    if (sessionValue == "1" && sid == "admin" || sid == "owner") {
    
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
  ngOnInit(): void {
  }


  
}
