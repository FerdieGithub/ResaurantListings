import { Component, Input, OnInit } from '@angular/core';

import { Restaurant } from 'app/restaurants/restaurants.models';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss'],
})
export class RestaurantItemComponent implements OnInit {
  @Input()
  restaurant!: Restaurant;

  constructor() {}

  ngOnInit(): void {}
}
