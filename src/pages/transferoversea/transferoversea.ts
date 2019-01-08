import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { TransferOverseaModel } from '../../models/transferoversea.model';
import { getLocaleDateTimeFormat } from '@angular/common';

@Injectable()
@Component({
  selector: 'page-transferoversea',
  templateUrl: 'transferoversea.html'
})
export class TransferOverseaPage {
  
  transferoverseamodel: TransferOverseaModel= {
    country_name: '',
    bank_name: '',
    account_number: '',
    amount: 0,
    description: '',
  };
  
  formgroup:FormGroup;
  country:AbstractControl;
  bank:AbstractControl
  accountnumber:AbstractControl;
  payamount:AbstractControl;
  description:AbstractControl;  

  constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      country:['',Validators.required],
      bank:['',Validators.required],
      accountnumber:['',Validators.required],
      payamount:['',Validators.required],
      description: ['',Validators.required],
    });

    this.country= this.formgroup.controls['country'];
    this.bank = this.formgroup.controls['bank'];
    this.accountnumber= this.formgroup.controls['accountnumber'];
    this.payamount = this.formgroup.controls['payamount'];
    this.description = this.formgroup.controls['description'];
  }

  transfer(){
    if (this.transferoverseamodel.country_name == null || this.transferoverseamodel.bank_name == null || this.transferoverseamodel.account_number == null || this.transferoverseamodel.amount == null || this.transferoverseamodel.description == null) {
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
      this.fdb.list(`mydata/${auth.uid}/transaction/oversea`).push(this.transferoverseamodel);
    })
    
  } 
}
