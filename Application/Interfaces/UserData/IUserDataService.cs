using wakacyjny_last.Application.DTOs.UserDtos;

namespace wakacyjny_last.Application.Interfaces.User
{
    public interface IUserDataService
    {
        Task<UserDto> GetCurrentUserAsync(string userId);
        Task<bool> UpdateUserCredentials(string userId, string firstName, string lastName, bool Terms);
        Task<bool> DeleteUserByEmailAsync(string email);
        Task<IEnumerable<string>> GetUserRolesAsync(string userId);

    }
}
