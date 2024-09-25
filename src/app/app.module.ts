import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../app/store/reducers/counter.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { ReportBugComponent } from './report-bug/report-bug.component'; // New import

@NgModule({
  declarations: [AppComponent, MyCounterComponent, ReportBugComponent], // Add ReportBugComponent
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer }),
    MatDialogModule, // Import this module
    FormsModule, // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
