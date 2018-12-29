import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild('usergmail') gmail;
  @ViewChild('userpassword') password;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParamas: NavParams, private alertCtrl: AlertController) {

  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  login(){
    this.fire.auth.signInWithEmailAndPassword(this.gmail.value, this.password.value)
    .then(data => {
      console.log('got some data ',this.fire.auth.currentUser);
      
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    });
    console.log('Would sign in with ',this.gmail.value, this.password.value);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}