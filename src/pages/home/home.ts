import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';
import { UsersPage } from '../users/users';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messagePage = MessagesPage;
  userPage = UsersPage;  
  
  constructor(public navCtrl: NavController) {

  }

}
