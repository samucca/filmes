import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  key = "990e1daf868d93bad8452a8579d442f4";

  constructor(private http: HttpClient) { }

  getMovieId(id) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}`);
  }
}
