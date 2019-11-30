import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { GoferOutputComponent } from './gofer-output/gofer-output.component';
import { GoferListComponent } from './gofer-list/gofer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GoferOutputComponent,
    GoferListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    AppRoutingModule // leave AppRoutingModule last, to be after any app modules - see https://angular.io/guide/router "Module import order matters"
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
