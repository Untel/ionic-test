import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { MessagesPage } from '../messages/messages';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  helloClick () {
    this.auth.hello();
  }

  pingClick () {
    this.auth.ping();
  }

  login (form) {
    console.log(form);
    
    const { username, password } = form.value;
    
    this.auth.login(username, password).subscribe(() => this.navCtrl.setRoot(HomePage));    
  }

  goToRegisterPage () {
    this.navCtrl.push(RegisterPage);
  }

}
