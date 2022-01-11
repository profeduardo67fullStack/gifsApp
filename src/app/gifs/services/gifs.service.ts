import { Injectable } from '@angular/core';

@Injectable({
  /**Con esta caracteristica permite que los servicios puedan quedar definidos en el momento que se 
   * construye el bundle de la aplicación, el providedIn: 'root' en el decorador, le dice al Angular que no importa 
   * en que parte de su aplicación sea que esté, el servicio va a ser único y de manera global en el root, esto evita
   * que se tenga que se tenga que especificar en los providers de gifs.module.ts, es decir Angular lo eleva a un
   * nivel global de la aplicación
   */
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    
    return [...this._historial];//Para romper el paso por referencia y que por cualquier cosa no modifique el original
  }

  buscarGifs (query: string= ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);//Inserto al inicio del Arreglo
      this._historial = this._historial.splice(0,10);//Limitar a 10 las entradas de los items
    }
  }

}

