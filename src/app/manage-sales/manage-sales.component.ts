import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SmsService } from '../sms.service';

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {


  constructor(public router:Router,private smsService: SmsService) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue == "1" ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }

    phoneNumber= '+639566702686';
  message = 'hello my freind';
  onSubmit() {
    
    this.smsService.sendSMS(this.phoneNumber, this.message)
      .subscribe(
        (response) => {
          console.log('SMS sent successfully:', response);
        },
        (error) => {
          console.error('Failed to send SMS:', error);
        }
      );
  }
  }

