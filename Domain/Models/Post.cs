using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wakacyjny_last.Domain.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public int HotelRating { get; set; }
        public decimal TravelAgencyOpinions { get; set; }
        public decimal TripAdvisorOpinions { get; set; }
        public decimal GoogleOpinions { get; set; }
        public string Url { get; set; }
        public string CityOfDeparture { get; set; }
        public int NumberOfPerson { get; set; }
        public decimal Price { get; set; }
        public byte[] HolidayImage { get; set; }
        public string TravelAgency { get; set; }
        public string RegionHolidaysName { get; set; }
        public string CityHolidaysName { get; set; }
        public string CountryHolidaysName { get; set; }
        public string HotelHolidaysName { get; set; }
        public string Food { get; set; }
        public bool isPremium { get; set; }
        public DateTime DateOffer { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Comments { get; set; }
        public string UserId { get; set; }
        public User User { get; set; } = default!;
    }
}
