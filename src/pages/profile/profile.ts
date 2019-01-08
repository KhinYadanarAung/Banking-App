import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfileModel } from '../../models/profile.model';
@Injectable()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    profilemodel: ProfileModel = {
        first_name: '',
        last_name: '',
        account_number: '',
        amount: 0
    }

    formgroup:FormGroup;
    firstname: AbstractControl;
    lastname: AbstractControl;
    accountnumber:AbstractControl;

    constructor(private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, private alertCtrl: AlertController) {
        this.formgroup = formbuilder.group({
            firstname:['',Validators.required],
            lastname:['',Validators.required],
            accountnumber:['',Validators.required]
        });

        this.firstname= this.formgroup.controls['firstname'];
        this.lastname= this.formgroup.controls['lastname'];
        this.accountnumber= this.formgroup.controls['accountnumber'];
    }

    submit(){
        if (this.profilemodel.account_number == null || this.profilemodel.first_name == null || this.profilemodel.last_name == null) {           
            let alert = this.alertCtrl.create({
                title: 'Unsuccessful!',
                message: 'You need to input all the requirements.',
                buttons: ['OK']
            })
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Success!',
                message: 'Thank you!',
                buttons: ['OK']
            })
            alert.present();
            this.navCtrl.push(LoginPage);
        }
        this.fire.authState.take(1).subscribe(auth => {
            this.fdb.list(`mydata/${auth.uid}/profile`).push(this.profilemodel);
        })
    }

}