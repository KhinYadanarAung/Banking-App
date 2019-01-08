import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TransferPage } from '../pages/transfer/transfer';
import { PayNowPage } from '../pages/paynow/paynow';
import { TransactionHistoryPage } from '../pages/transactionhistory/transactionhistory';
import { TransferCreditCardPage } from '../pages/transfercreditcard/transfercreditcard';
import { TransferOtherAccountPage } from '../pages/transferotheraccount/transferotheraccount';
import { TransferOverseaPage } from '../pages/transferoversea/transferoversea';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage  } from '../pages/profile/profile';
import { DepositPage } from '../pages/deposit/deposit';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const config = {
    apiKey: "AIzaSyCTR2i3ocJu6vs8ZOzTqrdjFMg4MAXmDVY",
    authDomain: "datab-11120.firebaseapp.com",
    databaseURL: "https://datab-11120.firebaseio.com",
    projectId: "datab-11120",
    storageBucket: "datab-11120.appspot.com",
    messagingSenderId: "997178872228"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TransferPage,
    PayNowPage,
    TransactionHistoryPage,
    TransferCreditCardPage,
    TransferOtherAccountPage,
    TransferOverseaPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DepositPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TransferPage,
    PayNowPage,
    TransactionHistoryPage,
    TransferCreditCardPage,
    TransferOtherAccountPage,
    TransferOverseaPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DepositPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
