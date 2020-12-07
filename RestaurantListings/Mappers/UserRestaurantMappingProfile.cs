using AutoMapper;
using RestaurantListings.Data.Entities;
using RestaurantListings.Models;

namespace RestaurantListings.Mappers
{
    public class UserRestaurantMappingProfile : Profile
    {
        public UserRestaurantMappingProfile()
        {
            CreateMap<Restaurant, UserRestaurant>();
        }
    }
}
