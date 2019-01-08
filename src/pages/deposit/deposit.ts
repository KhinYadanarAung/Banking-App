import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';

import { DepositModel } from '../../models/deposit.model';

@Injectable()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html'
})
export class DepositPage {

  depositmodel: DepositModel= {
    amount: 0
  };

  formgroup:FormGroup;
  payamount:AbstractControl;
 
  constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      payamount:['',Validators.required]
    });
    this.payamount = this.formgroup.controls['payamount'];

  }

  add(){
    if (this.depositmodel.amount == null){
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
      this.navCtrl.push(TransactionHistoryPage);
    }
    this.fire.authState.take(1).subscribe(auth => {
      this.fdb.list(`mydata/${auth.uid}/transaction/deposit`).push(this.depositmodel);
    })
  }
}