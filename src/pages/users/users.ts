import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users;

  constructor(public navCtrl: NavController, public navParams: NavParams, private messageService: MessagesProvider) {
  }

  ionViewDidLoad() {
    this.messageService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

}
