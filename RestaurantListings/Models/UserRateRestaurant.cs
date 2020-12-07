namespace RestaurantListings.Models
{
    public class UserRateRestaurant
    {
        public string UserName { get; set; }

        public int RestaurantId { get; set; }

        public decimal Rating { get; set; }
    }
}
