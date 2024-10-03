import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: '', component: MyCounterComponent }, // Default route for the main page
  { path: 'report-bug', component: ReportBugComponent }, // Route for the report bug page
  { path: ':userId', component: UserInfoComponent }, // Route for user info (with userId)
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route to redirect to the default page if an invalid URL is accessed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
