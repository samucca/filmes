import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DetailsService } from '../service/details.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SearchService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [''],
      list_search: this.formBuilder.array([]),
    });

    this.form.get('search').valueChanges
      .pipe(debounceTime(100))
      .subscribe(item => {
        this.getSearch(item)
      })
  }

  getSearch(search) {
    this.service.getSearch(search).subscribe(item => {
      if (item && item.results.length) {
        this.formArray(item);
      }
      else {
        this.cleanArray();
      }
    }, err => {
      this.cleanArray();
    })
  }

  formArray(item) {
    const arr = <FormArray>this.form.controls.list_search;
    arr.controls = [];
    arr.removeAt(0);

    if (item && item.results) {
      item.results.map(i => {
        arr.push(this.formBuilder.group({
          id: [i.id],
          original_title: [i.original_title]
        }));
      })
      this.form.controls.list_search.patchValue(arr.value)
    }
  }

  cleanArray() {
    const arr = <FormArray>this.form.controls.list_search;
    arr.controls = [];
    arr.removeAt(0);
  }
}
