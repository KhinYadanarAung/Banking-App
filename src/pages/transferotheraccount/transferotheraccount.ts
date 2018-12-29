import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-transferotheraccount',
  templateUrl: 'transferotheraccount.html'
})
export class TransferOtherAccountPage {
  formgroup:FormGroup;
  accountnumber:AbstractControl;
  payamount:AbstractControl;

  alldata = [];  
  otheraccountnumber: any;
  amount: any;

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      accountnumber:['',Validators.required],
      payamount:['',Validators.required]
    });

    this.accountnumber= this.formgroup.controls['accountnumber'];
    this.payamount = this.formgroup.controls['payamount'];

    this.fdb.list("/mydata/").subscribe(_data => {
      this.alldata = _data;

      console.log(this.alldata);
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TransferOtherAccountPage');
  }

  transfer(){
    if (this.otheraccountnumber == null || this.amount == null){
      let alert = this.alertCtrl.create({
        title: 'Unsuccessful Transaction!',
        message: 'You need to input account number and amount',
        buttons: ['OK']
      })
      alert.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Success!',
        message: 'Transaction is already done',
        buttons: ['OK']
      })
      alert.present();
    }
    this.fdb.list("/mydata/").push(this.otheraccountnumber);
    this.fdb.list("/mydata/").push(this.amount);
  } 
}
