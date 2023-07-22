import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private reloadNavSubject: Subject<void> = new Subject<void>();
  public reloadNav$ = this.reloadNavSubject.asObservable();

  reloadNav() {
    this.reloadNavSubject.next();
  }
}