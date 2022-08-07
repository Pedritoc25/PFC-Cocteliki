import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class Firestore {
  constructor(
    private firestore: AngularFirestore,
    private notificacionService: NotificationsService,
    private _router: Router
  ){}


  //Crea un nuevo coctel
  public createCocktail(title: string, description: string, email: string | undefined, imageUrl: string) {
    const coctel ={
      title, description, email, imageUrl
    }
    return this.firestore.collection('cocktails').add(coctel);
  }

    //Crea un nuevo usuario
    public createUser(email: string, name: string, lastNames: string) {
      const usuario = {
      email:email,
      name:name,
      lastNames:lastNames
      }
      this.firestore.collection('users').add(usuario)
      .then(res => {
        console.log("usuario creado con éxito en firestore!")
        console.log(res)
        this.notificacionService.success(
          'Success',
          'Usuario creado correctamente',
          {
          position: ['bottom', 'right'],
          timeOut: 3000,
          animate: 'fade',
          showProgressBar: true
          }
        )
        this._router.navigate(["/home"])
      })
      .catch(err => {
        console.log("error creando user: ", err)
        this.notificacionService.error(
          'Error',
          'Error creando al usuario: '+err ,
          {
          position: ['bottom', 'right'],
          timeOut: 3000,
          animate: 'fade',
          showProgr8essBar: true
          }
        )
      })
    }
  //Obtiene cocktail por id
  public getCocktailByID(documentId: string) {
    return this.firestore.collection('cocktails').doc(documentId).get();
  }

  
  public getUsuario(email: string | null) {
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).get();
  }

  //Obtiene todos los cockteles
  public getCocktails() {
       return this.firestore.collection('cocktails').get()
  }
  
  //Actualiza un coctel
  public updateCocktail(documentId: string, title: string, description: string, email: string | undefined, imageUrl: string) {
    const coctel ={
      title, description, email, imageUrl
    }
    return this.firestore.collection('cocktails').doc(documentId).set(coctel);
  }


  //dELETE COCKTAIL
  public deleteCocktail(documentId: string) {
    return this.firestore.collection('cocktails').doc(documentId).delete();
  }
  
}