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
      return identityClaims?.sub;
    }
    return "";
  }

  /**
   * Gets the available restaurants.
   */
  getRestaurants(): Observable<Restaurant[]> {
    var user : string = this.getUserId();
    if(user === "" || user === undefined || user === null){
      return this.http.get<Restaurant[]>('/api/restaurants');
    }else{
      return this.http.get<Restaurant[]>(`/api/restaurants/user/${user}`);
    }
  }

  rateRestaurant(restaurantId : number, user : string, rating : number) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`/api/restaurants/rate/${restaurantId}/${rating}/${user}`)
        .toPromise()
        .then((res: any) => {
          resolve(res);
        })
        .catch(error => {
          reject("Failed to submit rating: " + error.toString());
        });
    });
  } 

}
