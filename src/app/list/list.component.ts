import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListService } from '../service/list.service';
import { DetailsService } from '../service/details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  movies: any[] = [];
  copyMovies: any[] = [];
  cbMovies: any[] = [];
  generos: any[] = [];
  pagina: number;
  voltar: Boolean = false;
  genero: string = "";
  filme: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private detailsService: DetailsService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      movie: [''],
      genre: [''],
    });

    this.getMovies();
  }

  getMovies() {
    this.listService.getMovies().subscribe(item => {
      if (item) {
        for (let i = 0; i < item.results.length; i++) {
          item.results[i].poster_path = item.results[i].poster_path == null ? '' : `https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.results[i].poster_path}`;
        }
        this.movies = item.results;
      }
    }, err => {
      console.log(err)
    })
  }


  // getGeneros() {
  //   this.service.getGenero().subscribe(item => {
  //     if (item) {
  //       this.generos = item.genres;
  //     }
  //   }, err => {
  //     console.log(err)
  //   })
  // }

}
