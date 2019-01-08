import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { ProfileModel } from '../../models/profile.model';
import { TransactionModel } from '../../models/transaction.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    email: string;
    profiledata: FirebaseListObservable<ProfileModel[]>
    transactiondata: FirebaseListObservable<TransactionModel[]>

  constructor(private fdb :AngularFireDatabase,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.fire.auth.currentUser.email;
    this.fire.authState.subscribe(auth =>{
      this.profiledata = this.fdb.list(`mydata/${auth.uid}/profile`);
      this.transactiondata = this.fdb.list(`mydata/${auth.uid}/otheraccount`);
      console.log(this.transactiondata)
    })
  }
  
}
