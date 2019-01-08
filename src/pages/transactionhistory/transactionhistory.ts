import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TransactionModel } from '../../models/transaction.model';
import { TransferCreditCardModel } from '../../models/transfercreditcard.model';
import { TransferOverseaModel } from '../../models/transferoversea.model';
import { TransferPayNowModel } from '../../models/paynow.model';
import { DepositModel } from '../../models/deposit.model';
import { ProfileModel } from '../../models/profile.model';


@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {
  transactiondata: FirebaseListObservable<TransactionModel[]>
  transfercreditcarddata: FirebaseListObservable<TransferCreditCardModel[]>
  transferpaynowdata: FirebaseListObservable<TransferPayNowModel[]>
  transferoverseadata: FirebaseListObservable<TransferOverseaModel[]>
  depositdata: FirebaseListObservable<DepositModel[]>
  profiledata: FirebaseListObservable<ProfileModel[]>

  profile_data_obj = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private fire: AngularFireAuth) {
    this.fire.authState.subscribe(auth =>{
      this.fdb.list(`mydata/${auth.uid}/profile`).forEach(rec => {
        console.log(rec)
        this.profile_data_obj = rec;
        // rec[0].amount
      })
      this.transactiondata = this.fdb.list(`mydata/${auth.uid}/transaction/otheraccount`);
      this.transfercreditcarddata = this.fdb.list(`mydata/${auth.uid}/transaction/creditcard`);
      this.transferpaynowdata = this.fdb.list(`mydata/${auth.uid}/transaction/paynow`);
      this.transferoverseadata = this.fdb.list(`mydata/${auth.uid}/transaction/oversea`);
      this.depositdata = this.fdb.list(`mydata/${auth.uid}/transaction/deposit`);
    })  
  }

  
}