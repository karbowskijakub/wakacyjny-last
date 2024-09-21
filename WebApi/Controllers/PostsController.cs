using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using wakacyjny_last.Domain.Models;
using Microsoft.EntityFrameworkCore;
using wakacyjny_last.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace wakacyjny_last.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly PostsRepository _postsRepository;

        public PostsController(PostsRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postsRepository.GetAllPostsAsync();
            if (posts == null || !posts.Any())
            {
                return NotFound("Brak postów.");
            }

            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromForm] PostsDto postDto)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Użytkownik nie jest zalogowany.");
                }

                await _postsRepository.AddPostAsync(postDto, userId);

                return Ok(new { message = "Post został dodany pomyślnie." });
            }

            return BadRequest(ModelState);
        }


        private byte[] ConvertToByteArray(IFormFile imageFile)
        {
            if (imageFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    imageFile.CopyTo(memoryStream);
                    return memoryStream.ToArray();
                }
            }
            return null;
        }
    }
}
