import { HttpClient } from '@angular/common/http';
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

  /**Hacemos una variable con la APIKey que generamos en developer.giphy */

  private apikey: string = 'BySZi1vxxXobUX2FhTLqexPbKS4wjxnY';

  private _historial: string[] = [];

  /**Creamos una propiedad donde almacenar los resultados */

  public resultados: any[] = [];




  get historial(){
    
    return [...this._historial];//Para romper el paso por referencia y que por cualquier cosa no modifique el original
  }

  /**Aca inyectamos el servicio de HttpClient */

  constructor(private http: HttpClient){}


  // async buscarGifs (query: string= ''){

    async buscarGifs (query: string= ''){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);//Inserto al inicio del Arreglo
      this._historial = this._historial.splice(0,10);//Limitar a 10 las entradas de los items
    }


    /**Hacemo una petición HTTP */

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=BySZi1vxxXobUX2FhTLqexPbKS4wjxnY&q=${query}&limit=10`)
    .subscribe((resp: any) => {//Este se ejecuta cuando se tenga la resolución de este get
      console.log(resp.data);
      this.resultados=resp.data;
    })




    //Podemos hacer la conexión con JS puro, por medio de promesas

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=BySZi1vxxXobUX2FhTLqexPbKS4wjxnY&q=dragon ball z&limit=10')//Esto regresará una promesa
    // .then(resp => {
    //   resp.json().then(data => {
    //     console.log(data);
    //   })
    // })

    //Tambien podemos hacerlo mandando cun metodo async

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BySZi1vxxXobUX2FhTLqexPbKS4wjxnY&q=dragon ball z&limit=10')
    // const data = await resp.json();
    // console.log(data);


  }

}

