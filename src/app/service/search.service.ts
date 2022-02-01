import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  key = "990e1daf868d93bad8452a8579d442f4";
  language = "language=pt-BR";

  constructor(private http: HttpClient) { }

  getSearch(search: string) {
    return this.http.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${search}&adult=false&sort_by=created_at.asc&${this.language}`);
  }
}
