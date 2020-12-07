using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListings.Data.Entities
{
    public class UserRating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string UserHandle { get; set; }

        [Required]
        [ForeignKey("Restaurant")]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        public decimal Rating { get; set; }
    }
}
