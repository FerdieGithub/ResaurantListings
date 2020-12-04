import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.scss'],
})
export class RestaurantFiltersComponent implements OnInit {
  @Input()
  tags: string[] | null = [];

  @Output()
  filtersChange = new EventEmitter();

  form = this.fb.group({
    search: [null],
    tags: [[]],
    familyFriendly: [false],
    vegan: [false],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(this.filtersChange);
  }

  onTagChecked(tag: string): void {
    const tags = this.form.value.tags;
    tags.push(tag);
    this.form.patchValue({ tags });
  }
}
