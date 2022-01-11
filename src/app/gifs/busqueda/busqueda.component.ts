import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{
 // buscar(event: KeyboardEvent){//El tipo de evento cuando se pulsa una tecla

 //Para solucionar el que se limpie la caja
 //utilizaremos el decorador @ViewChild()

 //Con el símbolo de cierre de admiración, le decimos al Angular
 //que si existe el elemento y que no será nulo
 //Not-null assertion operator (!)
 @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

 
 /**Hacemos una inyección  */

 constructor(private gifsService: GifsService){}//Con esto ya tenemos accesos a todas sus propiedades y métodos incluido agregarGifs



    buscar(){
      const valor = this.txtBuscar.nativeElement.value;
      
      if(valor.trim().length === 0){//Para evitar que se incrusten valores vacios
        return;
      }



      this.gifsService.buscarGifs(valor);
    
      this.txtBuscar.nativeElement.value='';
  }
}
