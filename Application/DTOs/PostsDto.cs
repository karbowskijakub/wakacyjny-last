using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace wakacyjny_last.Domain.Models
{
    public class PostsDto
    {
        [Required]
        public int NumberOfPerson { get; set; }

        [Required]
        public IFormFile HolidayImage { get; set; }
    }
}