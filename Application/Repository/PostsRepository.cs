using System.Threading.Tasks;
using wakacyjny_last.Domain.Models;

using Microsoft.EntityFrameworkCore;
using wakacyjny_last.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace wakacyjny_last.Infrastructure.Repositories
{
    public class PostsRepository
    {
        private readonly IAppDbContext _context;

        public PostsRepository(IAppDbContext context)
        {
            _context = context;
        }

        // Metoda do dodawania nowego posta
        public async Task AddPostAsync(PostsDto postDto, string userId)
        {

            if (postDto.HolidayImage != null && postDto.HolidayImage.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await postDto.HolidayImage.CopyToAsync(memoryStream);
                    var post = new Post
                    {
                        NumberOfPerson = postDto.NumberOfPerson,
                        HolidayImage = memoryStream.ToArray(), // Convert to byte array
                        UserId = userId,
                        HotelRating = postDto.HotelRating,
                        TravelAgencyOpinions = postDto.TravelAgencyOpinions,
                        TripAdvisorOpinions = postDto.TripAdvisorOpinions,
                        GoogleOpinions = postDto.GoogleOpinions,
                        Url = postDto.Url,
                        CityOfDeparture = postDto.CityOfDeparture,
                        Price = postDto.Price,
                        TravelAgency = postDto.TravelAgency,
                        RegionHolidaysName = postDto.RegionHolidaysName,
                        CityHolidaysName = postDto.CityHolidaysName,
                        CountryHolidaysName = postDto.CountryHolidaysName,
                        HotelHolidaysName = postDto.HotelHolidaysName,
                        Food = postDto.Food,
                        isPremium = postDto.isPremium,
                        DateOffer = postDto.DateOffer,
                        StartDate = postDto.StartDate,
                        EndDate = postDto.EndDate,
                        Comments = postDto.Comments
                    };

                    _context.Posts.Add(post);
                    await _context.SaveChangesAsync(); // Save changes to the database
                }
            }
            else
            {
                throw new Exception("HolidayImage is required."); // Or handle it in a way that fits your application logic
            }
        }


        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {

            return await _context.Posts.ToListAsync();
        }
        private byte[] ConvertToByteArray(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                return ms.ToArray();
            }
        }

    }
}