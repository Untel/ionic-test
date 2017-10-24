import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import * as _m from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';


/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  baseUrl = 'https://cesi.cleverapps.io';

  timer: Observable<any>;

  private messageSubject: Subject<any>;

  constructor(private http: Http, private auth: AuthProvider) {
    _m.locale('fr');
    this.messageSubject = new ReplaySubject(1);

    Observable.interval(3000)
      .switchMap(() => this.getMessagesObs())
      .subscribe((data) => {
        this.messageSubject.next(data);
      });
  }

  getMessagesObs (): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/messages`, { headers: this.auth.getHeaders() })
      .map(response => response.json())
      .map(users => users.map(u => {
        u.moment = _m(u.date);
        return u;
      }))
      .do(messages => console.log('messages', messages));
  }

  getMessages (): Observable<any> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message): Observable<any> {
    const body = `message=${message}`;
    return this.http
      .post(`${this.baseUrl}/messages`, body, { headers: this.auth.getHeaders() })
  }

  getUsers (): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/users`, { headers: this.auth.getHeaders() })
      .map(response => response.json())
      .map(users => users.map(u => {
        u.moment = _m(u.date);
        return u;
      }))
      .do(users => console.log('users', users));
  }



}
