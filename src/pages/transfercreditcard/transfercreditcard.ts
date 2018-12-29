import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-transfercreditcard',
  templateUrl: 'transfercreditcard.html'
})
export class TransferCreditCardPage {
  formgroup:FormGroup;
  cardnumber:AbstractControl;
  payamount:AbstractControl;

  alldata = [];  
  creditcardnumber: any;
  amount: any;

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
    this.formgroup = formbuilder.group({
      cardnumber:['',Validators.required],
      payamount:['',Validators.required]
    });

    this.cardnumber= this.formgroup.controls['cardnumber'];
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
    if (this.creditcardnumber == null || this.amount == null){
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
    this.fdb.list("/mydata/").push(this.creditcardnumber);
    this.fdb.list("/mydata/").push(this.amount);
  }
}