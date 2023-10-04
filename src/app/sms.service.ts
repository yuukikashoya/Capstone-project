import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiUrl = 'https://6jxe1r.api.infobip.com/sms/1/text/single'; 
  private apiKey = 'b426bee2994cc305516a0c5cb641af64-f9556a17-aeb7-4133-abfe-4ac32fb05129'; 
  constructor(private http: HttpClient) {}
  sendSMS(phoneNumber: string, message: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `App ${this.apiKey}`
    });
    const payload = {
      to: phoneNumber,
      text: message
    };
    return this.http.post(this.apiUrl, payload, { headers });
  }
}