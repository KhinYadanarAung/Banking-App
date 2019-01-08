import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';

import { ProfileModel } from '../../models/profile.model';
import { TransferPayNowModel } from '../../models/paynow.model';

@Injectable()
@Component({
  selector: 'page-paynow',
  templateUrl: 'paynow.html'
})
export class PayNowPage {

  transferpaynowmodel: TransferPayNowModel= {
    phone_number: '',
    amount: 0,
    description: '',
  };
  
  formgroup:FormGroup;
  phone:AbstractControl;
  payamount:AbstractControl;
  description:AbstractControl;
 
  constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      phone:['',Validators.required],
      payamount:['',Validators.required],
      description: ['',Validators.required]
    });

    this.phone= this.formgroup.controls['phone'];
    this.payamount = this.formgroup.controls['payamount'];
    this.description = this.formgroup.controls['description'];
  }
  
  transfer(){
    
    if (this.transferpaynowmodel.phone_number == null || this.transferpaynowmodel.amount == null || this.transferpaynowmodel.description == null){
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
      this.fdb.list(`mydata/${auth.uid}/transaction/paynow`).push(this.transferpaynowmodel);
    })
  }
}