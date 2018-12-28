import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-transferotheraccount',
  templateUrl: 'transferotheraccount.html'
})
export class TransferOtherAccountPage {
  
  alldata = [];  
  otheraccountnumber: any;
  amount: any;

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.fdb.list("/mydata/").subscribe(_data => {
      this.alldata = _data;

      console.log(this.alldata);
    })
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TransferOtherAccountPage');
  }

  transfer(){
    this.fdb.list("/mydata/").push(this.otheraccountnumber);
    this.fdb.list("/mydata/").push(this.amount);
  }
  
}
