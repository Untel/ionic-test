import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public baseUrl = 'https://cesi.cleverapps.io';  
  public token: string;

  constructor(private http: Http) {}

  hello (name = 'Adrien') {
    this.http
      .get(`${this.baseUrl}/hello?name=${name}`)
      .map( response => response.text() )
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log('ERREUR', error);
      });
  }

  ping () {
    this.http
      .post(`${this.baseUrl}/ping`, {})
      .map( response => response.text() )      
      .subscribe(response => {
        console.log(response);
      });
  }

  register ( username, password, urlPhoto ) : Observable<any> {

    const body = `username=${username}&pwd=${password}&urlPhoto=${urlPhoto}`;

    return this.http
      .post(`${this.baseUrl}/signup`, body, { headers: this.getHeaders() });
  }
  login ( username, password ) : Observable<any> {

    const body = `username=${username}&pwd=${password}`;    
    return this.http
      .post(`${this.baseUrl}/signin`, body, { headers: this.getHeaders() })
      .map(response => response.json())
      .do(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        } else {
          localStorage.removeItem('token');
        }
      });
  }

  getHeaders() {
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (token) headers.append('token', token);
    return headers;
  }

}
