import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TransactionModel } from '../../models/transaction.model';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';

@Injectable()
@Component({
  selector: 'page-transferotheraccount',
  templateUrl: 'transferotheraccount.html'
})
export class TransferOtherAccountPage {

  profile: FirebaseListObservable<any>

  transactionmodel: TransactionModel = {
    country_name: '',
    bank_name: '',
    account_number: '',
    amount: 0,
    description: ''
  }

  formgroup:FormGroup;
  accountnumber:AbstractControl;
  payamount:AbstractControl;
  description:AbstractControl;

  constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      accountnumber:['',Validators.required],
      payamount:['',Validators.required],
      description: ['',Validators.required],
    });

    this.accountnumber= this.formgroup.controls['accountnumber'];
    this.payamount = this.formgroup.controls['payamount'];
    this.description = this.formgroup.controls['description'];
    
  }

  transfer(){
    if (this.transactionmodel.account_number == null || this.transactionmodel.amount == null || this.transactionmodel.description == null) {
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
      this.fdb.list(`mydata/${auth.uid}/transaction/otheraccount`).push(this.transactionmodel);
    })
  }

}
