import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../pages/interfaces/interface';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  categoriaActual = '';
  categoriaPage = 0;

  headlinesPage: number = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query ){
    query = apiUrl + query; 

    return this.http.get<T>(query, { headers });

  }

  getTopHeadlines(){

    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

  }

  getTopHeadlinesCategoria( categoria: string ){
    //return this.http.get(`${apiUrl}/top-headlines?country=us&category=business&apiKey=3809d1f36977485b8a72135a59e943cb`);

    if( this.categoriaActual === categoria ){
      this.categoriaPage++;
    }else{
      this.categoriaActual = categoria;
      this.categoriaPage = 1;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}
