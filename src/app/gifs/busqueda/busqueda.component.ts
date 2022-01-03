import { Component, ElementRef, ViewChild } from '@angular/core';

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

    buscar(){
      const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    this.txtBuscar.nativeElement.value='';
  }
}
