import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DetailsService } from '../service/details.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements AfterViewInit, OnInit {

  form: FormGroup;

  constructor(
    private detailsService: DetailsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      img: [''],
      title: [''],
      release_date: [''],
      overview: ['']
    })
  }

  ngAfterViewInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.activeRoute.params.subscribe(routeParams => {
        this.detailsService.getMovieId(routeParams.id).subscribe(item => {
          this.setValue(item);
        }, err => {
        })
      });
    });
  }

  setValue(item) {
    this.form.get('title').patchValue(item.title);
    this.form.get('release_date').patchValue(item.release_date);
    this.form.get('overview').patchValue(item.overview);
    this.form.get('img').patchValue(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
  }
}
