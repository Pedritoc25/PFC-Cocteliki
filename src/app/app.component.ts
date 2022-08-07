import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './services/authentication.service';
import { Firestore } from './services/firestore.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cocktails-test';
  cocktails: any[] = [];

  constructor(
    public auth: AuthenticationService,
    public firestoreService: Firestore,
    public router: Router, private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
      //this.spinner.show()
      this.auth.listenForSessionChanges();
  }

  public logOut():void{
    this.auth.logOut()
  }
}