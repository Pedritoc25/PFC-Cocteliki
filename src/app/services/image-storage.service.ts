import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';


firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.storage().ref();

  constructor() { }

  subirImagen(nombre: string, imgBase64: any){
    return this.storageRef.child("cocktails/"+nombre).putString(imgBase64, 'data_url')
    .then((respuesta) => {
      console.log("IMAGEN CREADA CON EXITO")
      return respuesta.ref.getDownloadURL()
      .then(url => {
        console.log("URL RECUPERADA CON EXITO")
        return url
      })
      .catch(() => {
        console.log("ERROR RECUPERAR URL")
        return null;
      })
    })
    .catch(() => {
      console.log("ERROR CREAR IMAGEN")
      return null;
    })
  }
}