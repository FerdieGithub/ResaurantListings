import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantsRoutingModule } from 'app/restaurants/restaurants-routing.module';

import { RestaurantsComponent } from 'app/restaurants/restaurants.component';
import { RestaurantListComponent } from 'app/restaurants/restaurant-list/restaurant-list.component';
import { RestaurantItemComponent } from 'app/restaurants/restaurant-item/restaurant-item.component';
import { RestaurantFiltersComponent } from 'app/restaurants/restaurant-filters/restaurant-filters.component';
import { RestaurantRatingComponent } from './restaurant-rating/restaurant-rating.component';
import { AppMaterialModules } from 'app/material.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RestaurantsRoutingModule, AppMaterialModules],
  declarations: [
    RestaurantsComponent,
    RestaurantListComponent,
    RestaurantItemComponent,
    RestaurantFiltersComponent,
    RestaurantRatingComponent
  ],
})
export class RestaurantsModule {}
