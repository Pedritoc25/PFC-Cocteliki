import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateEditCocktailComponent } from './components/create-edit-cocktail/create-edit-cocktail.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConfirmationDialog} from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CreateEditCocktailComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    RouterModule,
    //Conexion firebase angular
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule,
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
