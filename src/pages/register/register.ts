import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

    @ViewChild('gmail') gmail;
    @ViewChild('password') password;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Register Failed',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  register() {
    this.fire.auth.createUserWithEmailAndPassword(this.gmail.value, this.password.value)
    .then(data => {
        console.log('got data ', data);
        this.navCtrl.push(ProfilePage);
    })
    .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      });
    console.log('Would register user with ', this.gmail.value, this.password.value);
  }
}