using AutoMapper;
using RestaurantListings.Data.Entities;
using RestaurantListings.Models;

namespace RestaurantListings.Mappers
{
    public class UserRatingMappingProfile : Profile
    {
        public UserRatingMappingProfile()
        {
            CreateMap<UserRateRestaurant, UserRating>();
        }
    }
}
