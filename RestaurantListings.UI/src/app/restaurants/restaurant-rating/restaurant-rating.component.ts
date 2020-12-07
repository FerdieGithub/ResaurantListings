import { Component, OnInit, Input } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurant-rating',
  templateUrl: './restaurant-rating.component.html',
  styleUrls: ['./restaurant-rating.component.scss'],
})

export class RestaurantRatingComponent implements OnInit {

  @Input() starRating: number = 0;
  @Input() userRating: number = 0;
  @Input() restaurantId: number = 0;

  authenticated = false;
  userName = "";
  userRatingStr : string = "0";

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.authenticated = this.restaurantsService.authenticated;
    if (this.authenticated){
      this.userName = this.restaurantsService.getUserId();
    }
    this.userRatingStr = parseInt(this.userRating.toString()).toString();
  }

  changeValue(e : any){
    if (this.restaurantId > 0){
      this.restaurantsService.rateRestaurant(this.restaurantId, this.userName, e.value)
    }
  }
}
