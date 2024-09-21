using System.Threading.Tasks;
using wakacyjny_last.Domain.Models;

using Microsoft.EntityFrameworkCore;
using wakacyjny_last.Application.Interfaces;
using Microsoft.AspNetCore.Http;

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
            var post = new Post
            {
                NumberOfPerson = postDto.NumberOfPerson,
                HolidayImage = ConvertToByteArray(postDto.HolidayImage),
                UserId = userId
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
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