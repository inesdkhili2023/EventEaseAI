import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<any>(null);
  token$ = this.tokenSubject.asObservable();

  setIdToken(token: any) {
    this.tokenSubject.next(token);
  }

  getToken() {
    return this.tokenSubject.asObservable();
  }
}
