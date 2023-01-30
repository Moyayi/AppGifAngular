import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = 'ISMt6vRSKYYlThz7JqSsWOlY6D8Zj01m'
  private _historial : string[] = [];
  
  public resultados : any[] = [];

  get historial(): string[]{
    return [...this._historial]
  }

  constructor( private http: HttpClient ){}

  buscarGifs( query : string ){
    query = query.trim().toLowerCase();

    if(query.trim().length === 0){
      return ; 
    }else{
      if(this._historial.length > 9){
        this._historial.pop()
      }
      if(!this._historial.includes(query)){
        this._historial.unshift( query )
      }
    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=ISMt6vRSKYYlThz7JqSsWOlY6D8Zj01m&q=${query}&limit=10`)
      .subscribe( (resp : any) => {
        this.resultados = resp.data
        console.log(this.resultados)
      });
  }
}
