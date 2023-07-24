import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwilioService } from '../twilio.service';

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

  constructor(public router:Router,private twilioService: TwilioService) {

    const sessionValue = sessionStorage.getItem('type');
   
    if (sessionValue == "1" ) {
    
    } else {
      this.router.navigate(['/sign'])
    }
   }

  ngOnInit(): void {
  }
  async sendSMS() {
    const toPhoneNumber = '+639126747327'; // Replace with the recipient's phone number
    const message = 'yey gumagana lets goooooo!'; // Replace with the desired message

    try {
      await this.twilioService.sendSMS(toPhoneNumber, message);
      console.log('SMS sent successfully!');
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  }
}
