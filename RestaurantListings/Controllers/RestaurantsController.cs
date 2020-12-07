using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantListings.Data;
using RestaurantListings.Data.Entities;
using RestaurantListings.Models;

namespace RestaurantListings.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RestaurantsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns all restaurants.
        /// </summary>
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
            return _context.Restaurants.ToList();
        }

        /// <summary>
        /// Returns all restaurants, including the current user's restaurant ratings
        /// </summary>
        [HttpPost("user")]
        public async Task<List<UserRestaurant>> GetForUser([FromBody]string user)
        {
            List<Restaurant> data = await _context.Restaurants.ToListAsync();
            Dictionary<int, UserRestaurant> dataMapped = _mapper
                .Map<List<UserRestaurant>>(data)
                .ToDictionary(key => key.Id, val => val);
            var userRatings = await GetUserRatings(user);
            foreach (var rating in userRatings)
            {
                dataMapped[rating.RestaurantId].UserRating = rating.Rating;
            }
            return dataMapped.Values.ToList();
        }

        /// <summary>
        /// Returns the current user's restaurant ratings only
        /// </summary>
        [HttpGet("userRatings/{user}")]
        public async Task<List<UserRating>> GetUserRatings(string user)
        {
            return await _context.UserRating
                .Where(x => x.UserName == user)
                .ToListAsync();
        }

        /// <summary>
        /// Load or set a user restaurant rating
        /// </summary>
        [HttpPost("rate")]
        public async Task SubmitRating([FromBody] UserRateRestaurant rate)
        {
            UserRating entity = await _context.UserRating
                .FirstOrDefaultAsync(x => x.RestaurantId == rate.RestaurantId && x.UserName == rate.UserName);

            if (entity == null)
            {
                entity = _mapper.Map<UserRating>(rate);
                await _context.UserRating.AddAsync(entity);
            }
            else
            {
                entity.Rating = rate.Rating;
            }

            await _context.SaveChangesAsync();
        }
    }
}
