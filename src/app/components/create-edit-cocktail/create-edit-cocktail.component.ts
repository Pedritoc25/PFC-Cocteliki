import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Firestore } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/image-storage.service';

@Component({
  selector: 'app-create-edit-cocktail',
  templateUrl: './create-edit-cocktail.component.html',
  styleUrls: ['./create-edit-cocktail.component.css']
})
export class CreateEditCocktailComponent implements OnInit {


  public nombreCoctel:string;
  public descripcion:string;
  public image:any;
  private editMode:boolean;
  private id:string;

  constructor(private notificacionService: NotificationsService,
    private storageService:StorageService,
    private firestore: Firestore,
    public auth: AuthenticationService, private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private _router: Router

    ) {
    this.nombreCoctel="";
    this.descripcion="";
    this.image="../../../assets/img/question-mark-inside-a-circle.png";
    this.editMode=false
    this.id=""
  }




  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      if (params?.id){
        this.spinner.show()
        this.id=params.id
        this.editMode=true
        console.log(params.id)
        this.firestore.getCocktailByID(params.id).subscribe((cocktail:any) =>{
          this.nombreCoctel=cocktail.data().title;
        this.descripcion=cocktail.data().description;
        this.image=cocktail.data().imageUrl;
        setTimeout(() => this.spinner.hide(), 1000);})}
    } 
    )
  }
  /**
   * saveCocktail
   */
  public saveCocktail() {
    console.log(this.image)
    if (this.nombreCoctel.trim() && this.descripcion.trim() && this.image != "../../../assets/img/question-mark-inside-a-circle.png"){
      if (this.image.includes("https")){
        this.firestore.updateCocktail(this.id, this.nombreCoctel, this.descripcion, this.auth.userData.email, this.image
          ).then(coctelResponse => {
          this.notificacionService.success(
            this.editMode? "Cóctel Actualizado":
            'Cóctel creado',
            '',
            {
            position: ['bottom', 'right'],
            timeOut: 3000,
            animate: 'fade',
            showProgressBar: true
            }
            )}
      ).catch(() => {
      this.notificacionService.error(
        'Error crear cóctel',
        'Error guardar en el servidor',
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true
        }
        )
      })
    } 
    //imagen nueva(creacion o edicion)
      else{
        this.storageService.subirImagen(this.nombreCoctel+Date.now(),this.image)
        .then((url:any) =>{
          let llamada=null;
          if(this.editMode){
            llamada=this.firestore.updateCocktail(this.id, this.nombreCoctel, this.descripcion, this.auth.userData.email, url)
          }
          else{
            llamada=this.firestore.createCocktail(this.nombreCoctel, this.descripcion, this.auth.userData.email, url)
          }
          llamada.then(coctelResponse => {
            this.notificacionService.success(
              this.editMode? "Cóctel Actualizado":
              'Cóctel creado',
              '',
              {
              position: ['bottom', 'right'],
              timeOut: 3000,
              animate: 'fade',
              showProgressBar: true
              }
              )
               this.toHome()
              }
        ).catch(() => {
        this.notificacionService.error(
          this.editMode? "Error actualizando cóctel":
          'Error creando cóctel',
          '',
          {
          position: ['bottom', 'right'],
          timeOut: 3000,
          animate: 'fade',
          showProgressBar: true
          }
          )
        })
        })
        .catch(error =>{
          this.notificacionService.error(
            'Error subiendo imagen', '',
            {
            position: ['bottom', 'right'],
            timeOut: 3000,
            animate: 'fade',
            showProgressBar: true
            }
            )
          })
      }
   
    }
    else{
      console.log("Hay algun componente vacio")
      this.notificacionService.error(
        'Error rellenando formulario',
        'Título/Descripción vacíos o Imagen sin adjuntar',
        {
        position: ['bottom', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true
        }
      )
    }  
  }

  public cargarImg(e: any){
    console.log(e)
    const archivo = e.target.files[0];
    if (archivo!=null){
      const reader = new FileReader();

    // el reader lee el archivo que nos llega
    reader.readAsDataURL(archivo);
    // cuando lo lee, se lanza este evento
    reader.onloadend = () => {
      this.image = reader.result;
    }  
    }
    
  }

  public toHome(){
    this._router.navigate(["home"])
  }

}
