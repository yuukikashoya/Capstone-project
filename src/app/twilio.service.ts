import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private accountSid = 'ACb84d1f823d8b2e5fddea2764553c1baa';
  private authToken = '1476285e862986a909e53cf9c51995de';
  private fromPhoneNumber = '+12294664706';

  constructor(private http: HttpClient) {}

  sendSMS(toPhoneNumber: string, message: string) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.accountSid}:${this.authToken}`)
    });

    const body = `From=${this.fromPhoneNumber}&To=${toPhoneNumber}&Body=${encodeURIComponent(message)}`;

    return this.http.post(url, body, { headers }).toPromise();
  }
}
