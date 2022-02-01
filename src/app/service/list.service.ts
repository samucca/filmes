import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieClass } from '../model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  key = "990e1daf868d93bad8452a8579d442f4";
  language = "language=pt-BR";

  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieClass> {
    return this.http.get<MovieClass>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&sort_by=created_at.asc&${this.language}`);
  }
}
