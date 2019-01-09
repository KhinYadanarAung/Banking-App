import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TransferPage } from '../transfer/transfer';
import { TransferCreditCardModel } from '../../models/transfercreditcard.model';

@Injectable()
@Component({
  selector: 'page-transfercreditcard',
  templateUrl: 'transfercreditcard.html'
})
export class TransferCreditCardPage {

  transferamount: number;
  currentamount: number;

  transfercreditcardmodel: TransferCreditCardModel= {
    country_name: '',
    bank_name: '',
    account_number: '',
    amount: 0,
    description: '',
  };

  formgroup:FormGroup;
  cardnumber:AbstractControl;
  payamount:AbstractControl;
  description:AbstractControl;
 
  constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      cardnumber:['',Validators.required],
      payamount:['',Validators.required],
      description: ['',Validators.required]
    });

    this.cardnumber= this.formgroup.controls['cardnumber'];
    this.payamount = this.formgroup.controls['payamount'];
    this.description = this.formgroup.controls['description'];

  }

  transfer(){
    if (this.transfercreditcardmodel.account_number == null || this.transfercreditcardmodel.amount == null || this.transfercreditcardmodel.description == null){
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
      this.navCtrl.push(TransferPage);
    }
    this.fire.authState.take(1).subscribe(auth => {
      this.fdb.list(`mydata/${auth.uid}/transaction/creditcard`).push(this.transfercreditcardmodel);
      // this.transfercreditcardmodel # transaction_amount 
      this.transferamount = this.transfercreditcardmodel.amount;
      this.fdb.list(`mydata/${auth.uid}/profile`).forEach(rec => {
        this.currentamount = parseInt(rec[0].amount);

        console.log(this.currentamount-this.transferamount);
        
        // rec[0].amount # profile_amount
        // profile_amount +/- transaction_amount

        //this.fdb.list(`mydata/${auth.uid}/profile/{}`).set(rec)

         
      })
    })
  }
}