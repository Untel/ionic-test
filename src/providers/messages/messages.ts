import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import * as _m from 'moment';
import 'rxjs/add/operator/map';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  baseUrl = 'https://cesi.cleverapps.io';

  timer: Observable<any>;

  constructor(private http: Http, private auth: AuthProvider) {
    _m.locale('fr');
  }

  getMessages (): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/messages`, { headers: this.auth.getHeaders() })
      .map(response => response.json())
      .map(users => users.map(u => {
        u.moment = _m(u.date);
        return u;
      }))
      .do(messages => console.log('messages', messages));      
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
