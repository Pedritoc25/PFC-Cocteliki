import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public status:string;
  public correo:string;
  public nombre:string;
  public apellidos:string;
  public password:string;
  public password2:string;

  constructor(private notificacionService: NotificationsService, private authenticationService: AuthenticationService) { 
    this.status = "register";
    this.correo = "";
    this.nombre = "";
    this.apellidos = "";
    this.password = "";
    this.password2 = "";
  }

  ngOnInit(): void {
  }

 public toggleStatus(newStatus:string):void{
    this.status = newStatus;
    this.correo = "";
    this.nombre = "";
    this.apellidos = "";
    this.password = "";
    this.password2 = "";
    
 }
 
 public register():void{
   //Si alguno de los campos está vacio
   console.log("Boton registro")
  if (this.status.trim() == "" || 
  this.correo.trim() == "" || 
  this.nombre.trim() == "" || 
  this.apellidos.trim() == "" || 
  this.password.trim() == "" ||
  this.password2.trim() == ""){
    //mostrar pop
    this.notificacionService.error(
      'Error registro',
      'Faltan campos por rellenar',
      {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
      }
    )
  }
  else if(this.password != this.password2) {
    //mostrar pop
    this.notificacionService.error(
      'Error registro',
      'Las contraseñas no coinciden',
      {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
      }
    )
  }
  else{
    //Registrar
    this.authenticationService.signUp(this.correo, this.password, this.nombre, this.apellidos);
  }
 }

 public login():void{
  if (this.correo.trim() == "" || 
  this.password.trim() == ""){
    //mostrar pop
    this.notificacionService.error(
      'Error login',
      'Faltan campos por rellenar',
      {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
      }
    )
  }
  else{
    //logearse
    this.authenticationService.signIn(this.correo, this.password)
  }
 }


}
