import { Component, OnInit, OnDestroy  } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from 'app/restaurants/restaurants.models';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit, OnDestroy  {

  restaurants: Restaurant[] | null = null;
  tags!: Observable<string[]>;
  filters = new BehaviorSubject<any>({});
  subscription : any;

  constructor(private restaurantsService: RestaurantsService) {}

  sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit() {

    await this.sleep(1000); //hack to fix async issue when logging on too late on first login (my apologies, not the best effort, but ran out of time for a better solution)

    var restaurantsObservable = this.restaurantsService.getRestaurants();

    this.subscription = this.filters
      .pipe(
        switchMap((filters) =>
        restaurantsObservable
            .pipe(
              map((restaurants) => this.filterRestaurants(restaurants, filters))
            )
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.tags = restaurantsObservable
      .pipe(map((restaurants) => restaurants.flatMap((x) => x.tags)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFiltersChange(filters: any): void {
    this.filters.next(filters);
  }

  private filterRestaurants(
    restaurants: Restaurant[],
    filters: any
  ): Restaurant[] {
    if (filters.search) {
      var searchLower = filters.search.toLowerCase();
      restaurants = restaurants.filter(
        (x) => x.name.toLowerCase().search(searchLower) > -1 || x.description.toLowerCase().search(searchLower) > -1
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
