import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { Restaurant } from 'app/restaurants/restaurants.models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {

  constructor(private http: HttpClient, private oauthService: OAuthService) {}

  public get authenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getUserId(): string {
    if (this.authenticated){
      var identityClaims : any = this.oauthService.getIdentityClaims();
      return identityClaims?.sid;
    }
    return "";
  }

  /**
   * Gets the available restaurants.
   */
  getRestaurants(user : string = ""): Observable<Restaurant[]> {
    var userName : string = this.getUserId();
    if(userName === "" || userName === undefined || userName === null){
      return this.http.get<Restaurant[]>('/api/restaurants');
    }else{
      return this.http.post<Restaurant[]>('/api/restaurants/user', user);
    }
  }

  rateRestaurant(restaurant : Restaurant, user : string, rating : number) {
    var rateRestaurantObj = {
      UserName : user,
      RestaurantId : restaurant.id,
      Rating : rating
    };
    this.http.post('/api/restaurants/rate', rateRestaurantObj);
  }

}
