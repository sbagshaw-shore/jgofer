import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoferListComponent } from './gofer-list/gofer-list.component';
import { GoferOutputComponent } from './gofer-output/gofer-output.component';

const routes: Routes = [
  // nb: order matters; first match "wins"
  // also note that routes are only specified here and not in the tuf-web library (common) code, to allow child apps to use what they want
  {
    path: 'gofer', children: [
      { path: '', component: GoferListComponent },
      { path: ':id', component: GoferOutputComponent }
    ]
  },
  { path: '', redirectTo: 'gofer', pathMatch: 'full' },
  { path: '**', redirectTo: 'gofer' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
