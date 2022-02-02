import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Firestore } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayCocteles: any[]
  deleting:boolean
  loading:boolean

  public searchedText:string;
  constructor(private spinner: NgxSpinnerService, private firestore: Firestore, public authenticationservice:AuthenticationService
    ,private notificacionService: NotificationsService, private _router: Router) {
    this.searchedText = ""
    this.arrayCocteles = []
    this.deleting= false
    this.loading= false
   }

  ngOnInit(): void {
    this.loading=true
    this.spinner.show()
   this.getcocktails();
  }

  public search():void{
  this.spinner.show()
  this.getcocktails()
  }

  public eliminar(id:string):void{
    this.spinner.show()
    this.firestore.deleteCocktail(id).then(res => {
      console.log("Cóctel eliminado con éxito en firestore!")
      console.log(res)
      this.notificacionService.success(
        'Success',
        'Cóctel eliminado correctamente', 
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true
        }
      )
    this.getcocktails()})
    .catch(err => {
      console.log("error eliminando cóctel: ", err)
      this.notificacionService.error(
        'Error',
        'Error eliminando al cóctel: '+err ,
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgr8essBar: true
        }
      )
    })
  }

public edit(id:string):void{
  this._router.navigate(["cocktail",id])
}

  private getcocktails():any{
    this.loading=true
    this.firestore.getCocktails().subscribe(data => {
      let filteredCocktails:any = []
      data.docs.forEach((Coctel:any) =>{
      if(Coctel.data().title?.includes(this.searchedText.trim())){
        filteredCocktails.push(Coctel)
      }
      })
      this.arrayCocteles = filteredCocktails
      console.log(this.arrayCocteles)
      setTimeout(() => this.spinner.hide(), 1000);
      this.loading=false
    })
  }
  /*if (authenticationservice.userData.email == item.data().email){

  }*/
}
