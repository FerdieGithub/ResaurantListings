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

  authenticated = false;
  userName = "";

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.authenticated = this.restaurantsService.authenticated;
    if (this.authenticated){
      this.userName = this.restaurantsService.getUserId();
    }
  }

  changeValue(e : any){
    console.log("e", e); 
  }
}
