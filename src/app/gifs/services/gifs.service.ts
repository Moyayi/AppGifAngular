import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = 'ISMt6vRSKYYlThz7JqSsWOlY6D8Zj01m'
  private searchURL : string = 'https://api.giphy.com/v1/gifs'
  private _historial : string[] = [];
  private limit : string = '9'

  
  public resultados : Gif[] = [];

  get historial(): string[]{
    return [...this._historial]
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial') !) || []
  }

  clear( busqueda : string) : void{
    this._historial.splice(this._historial.findIndex((element) => element === busqueda), 1)
    localStorage.setItem('historial', JSON.stringify(this._historial))
  }

  buscarGifs( query : string ){
    query = query.trim().toLowerCase();
    if ( !this._historial.includes(query)){
      this._historial.unshift( query )
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', this.limit)
          .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.searchURL}/search`, { params })
      .subscribe( (resp) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      });
  }
}
