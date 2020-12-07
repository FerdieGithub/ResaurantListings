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

  authenticated = false;
  user : string | undefined = undefined;

  restaurants: Restaurant[] | null = null;

  tags!: Observable<string[]>;

  filters = new BehaviorSubject<any>({});

  constructor(private restaurantsService: RestaurantsService) {
    this.authenticated = restaurantsService.authenticated;
    this.user = restaurantsService.getUserId();
  }

  ngOnInit(): void {
    this.filters
      .pipe(
        switchMap((filters) =>
          this.restaurantsService
            .getRestaurants(this.authenticated ? this.user : "")
            .pipe(
              map((restaurants) => this.filterRestaurants(restaurants, filters))
            )
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.tags = this.restaurantsService
      .getRestaurants(this.authenticated ? this.user : "")
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
        (x) => x.name.search(filters.search) > -1
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
