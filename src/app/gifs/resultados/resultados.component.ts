import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  /**Creamos una propiedad para los resultados */
  get resultados(){
    return this.gifsService.resultados;
  }


  constructor(private gifsService: GifsService) { }/*Hacemos la inyección del Servicio */

  

}
