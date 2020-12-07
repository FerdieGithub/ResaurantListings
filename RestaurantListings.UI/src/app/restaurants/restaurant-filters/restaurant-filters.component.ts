import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.scss'],
})
export class RestaurantFiltersComponent implements OnInit, OnDestroy {
  @Input()
  tags: string[] | null = [];

  @Output()
  filtersChange = new EventEmitter();

  subscription : any;

  form = this.fb.group({
    search: [null],
    tags: [[]],
    familyFriendly: [false],
    vegan: [false],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = this.form.valueChanges.subscribe(this.filtersChange);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTagChecked(e : any, tag: string): void {
    const tags = this.form.value.tags;
    if (e.target.checked){
      tags.push(tag);
    }else{
      let index: number = tags.findIndex((x: { toString: () => string; }) => x === tag);
      if (index != -1){
        tags.splice(index, 1);
      }
    }
    this.form.patchValue({ tags });
  }
}
