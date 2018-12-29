import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

    @ViewChild('gmail') gmail;
    @ViewChild('password') password;
    @ViewChild('accountno') account;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPage');
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
        this.navCtrl.push(LoginPage);
    })
    .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      });
    console.log('Would register user with ', this.gmail.value, this.password.value, this.account.value);
  }
}