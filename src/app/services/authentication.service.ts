import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Firestore } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userData: any;

  constructor(private firebase: AngularFireAuth, private firestore:Firestore, 
    private notificacionService: NotificationsService, private spinner: NgxSpinnerService
    ,private _router: Router) {
      
   }

   public isUserLogged(): boolean {
     return !!this.userData
   }
 
   public listenForSessionChanges(): void {
    this.firebase.authState.subscribe(data => {
      console.log("datos de la sesion ----->" +data?.email)
      if (data ==  null){
        this.userData = null
        window.sessionStorage.removeItem('userData')
        //this.spinner.hide()
      }
      else{
        this.firestore.getUsuario(data?.email).subscribe(data =>{
          if (data ==  null){
            this.userData = null
            window.sessionStorage.removeItem('userData')
            //this.spinner.hide()
          }
          else{
            this.userData = data.docs[0].data()
            window.sessionStorage.setItem('userData', JSON.stringify(this.userData))
            //this.spinner.hide()
          }
        })
      }
      //this.userData = data?.uid;
    })
   }

   public signUp(email: string, password: string, nombre: string, apellidos: string): void {
    this.firebase.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully signed up!', res);
      this.firestore.createUser(email,nombre,apellidos)
      })
      .catch(error => {
       //mostrar pop
      this.notificacionService.error(
      'Error registro',
      error,
      {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
      }
    )
      });
   }

   public signIn(email: string, password: string): void{
    this.firebase.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully signed in!', res);
      this.notificacionService.success(
        'Login correcto',"",
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true
        }
      ) 
      this._router.navigate(["/home"])})
      .catch(err => {
      console.log('Something went wrong:',err.message);
      this.notificacionService.error(
        'Error login',
        err,
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true
        }
      )
      });
    }

   public logOut(): any {
     this.firebase.signOut();
     this._router.navigate(["/home"])
   }
}