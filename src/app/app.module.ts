import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { QRCodeModule } from 'angularx-qrcode';
import { counterReducer } from '../app/store/reducers/counter.reducer';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { UserInfoComponent } from './user-info/user-info.component'; // New import

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    ReportBugComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer }),
    MatDialogModule, // Import this module
    FormsModule, // Add FormsModule here
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // Firebase Firestore module
    AngularFirestoreModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
