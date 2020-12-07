import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from 'app/restaurants/restaurants.models';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] | null = null;

  tags!: Observable<string[]>;

  filters = new BehaviorSubject<any>({});

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.filters
      .pipe(
        switchMap((filters) =>
          this.restaurantsService
            .getRestaurants()
            .pipe(
              map((restaurants) => this.filterRestaurants(restaurants, filters))
            )
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.tags = this.restaurantsService
      .getRestaurants()
      .pipe(map((restaurants) => restaurants.flatMap((x) => x.tags)));
  }

  onFiltersChange(filters: any): void {
    this.filters.next(filters);
  }

  private filterRestaurants(
    restaurants: Restaurant[],
    filters: any
  ): Restaurant[] {
    if (filters.search) {
      restaurants = restaurants.filter(
        (x) => x.name.toLowerCase().search(filters.search.toLowerCase()) > -1 || x.description.search(filters.search.toLowerCase()) > -1
      );
    }

    filters.tags?.forEach((tag: string) => {
      restaurants = restaurants.filter((x) => x.tags.includes(tag));
    });

    if (filters.vegan) {
      restaurants = restaurants.filter((x) => !x.veganFriendly);
    }

    if (filters.familyFreindly) {
      restaurants = restaurants.filter((x) => x.familyFriendly);
    }

    return restaurants;
  }
}
