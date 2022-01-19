import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse} from '../interface/gifs.intarface';


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
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  /**Creamos una propiedad donde almacenar los resultados */

  public resultados: Gif[] = [];




  get historial(){
    
    return [...this._historial];//Para romper el paso por referencia y que por cualquier cosa no modifique el original
  }

  /**Aca inyectamos el servicio de HttpClient */

  constructor(private http: HttpClient){

    /**Primera forma de regresar el contenido */
 
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)//COn el signo de !, le decimos a Angular que confie en nosotros
    // }

    //O podemos hacerlo asi

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  // async buscarGifs (query: string= ''){

    async buscarGifs (query: string= ''){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);//Inserto al inicio del Arreglo
      this._historial = this._historial.splice(0,10);//Limitar a 10 las entradas de los items

      /**Aca puede ser un buen lugar para grabar en el localStorage */
      /**Para utilizar el LocalStorage, no es necesario importar nada, ya que esto es propio del navegador */
      localStorage.setItem('historial', JSON.stringify(this._historial));//Convertimos el objeto a texto por medio de JSON y su método .stringify
      


    }


    /**Creamos una variable o propiedad para parametrizar la URL */
    const params= new HttpParams()
      .set('api_key', this.apikey)
      .set('limit','10')
      .set('q',query);


    /**Hacemo una petición HTTP */
    /**Nota: en EMAC6 si vamos a mandar un objeto, que tenga como valor el mismo nombre del objeto, solo se puede andar el nombre
     * sin valor ej: params: params lo podriamos poner solo params
     */

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp) => {//Este se ejecuta cuando se tenga la resolución de este get
      console.log(resp.data);
      this.resultados=resp.data;
      //Esto se hace aca, por que es cuando yo ya tengo la respuesta, no lo podemos hacer arriba junto al otro
      localStorage.setItem('resultados', JSON.stringify(this.resultados));//Hacemos lo mismo para las imagenes que arroja el resultado
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

