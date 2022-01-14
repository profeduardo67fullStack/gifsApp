import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){//Creamos una propiedad getter, para poder modificar el HTML
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { //Decalrando una variable en el constructora hacemos la inyección de dependencias
  //Estamos inyectando el servicio

  }

  buscar(termino: string){
    this.gifsService.buscarGifs(termino);//Con esto se manda la busqueda que ya esta listada en el sidebar
  }
 
 
  

}
