import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, List, IonicFormInput } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MessagesProvider } from '../../providers/messages/messages';

import { Observable } from 'rxjs';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  messages = [];
  messages$: Observable<any>;

  users = [];
  users$: Observable<any>;

  @ViewChild(List) messageList: List;
  
  
  // @Input('token') token;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private auth: AuthProvider, 
    private messageService: MessagesProvider) {
    this.messages$ = this.messageService.getMessages();
    this.users$ =  this.messageService.getUsers();
  }


  ionViewDidLoad() {
    this.refreshMesages();
  }

  sendMessage(form) {
    
    const message = form.value.message;
    this.messageService.sendMessage(message).subscribe(send => {
      this.refreshMesages();
      form.value.message = '';
    });
  }

  refreshMesages(refresher?) {
    this.messages$
      .subscribe(response => {
        
        this.messages = response.sort((a, b) => b.date - a.date);
        if (refresher) refresher.complete();
      });

    this.users$.subscribe(response => {
      this.users = response;
    });
  }

  getAvatarOf (username) {
    const user = this.users.find(u => u.username === username);
    if (!user || !user.urlPhoto) return 'https://icca.univ-paris13.fr/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg';
    return user.urlPhoto;
  }

}
