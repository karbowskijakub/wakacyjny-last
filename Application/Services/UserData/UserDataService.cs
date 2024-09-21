using wakacyjny_last.Application.Interfaces;
using wakacyjny_last.Application.Interfaces.User;
using wakacyjny_last.Application.DTOs.UserDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace wakacyjny_last.Application.Services.User
{
    public class UserDataService : IUserDataService
    {
        private readonly IAppDbContext _dataContext;
        private readonly UserManager<Domain.Models.User> _userManager;

        public UserDataService(IAppDbContext dataContext, UserManager<Domain.Models.User> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public async Task<bool> UpdateUserCredentials(string userId, string firstName, string lastName, bool Terms)
        {
            try
            {
                var user = await GetUserByIdAsync(userId);

                if (user == null)
                {
                    throw new KeyNotFoundException("UpdateUserDataAsync: Nie znaleziono użytkownika.");
                }

                user.FirstName = firstName;
                user.LastName = lastName;
                user.Terms = Terms;
                user.RegisterDate = DateTime.UtcNow;

                _dataContext.Users.Update(user);
                await _dataContext.SaveChangesAsync(); 
                
                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("UpdateUserAsync: Wystąpił problem:", ex);
            }
        }

        public async Task<IEnumerable<string>> GetUserRolesAsync(string userId)
        {
            var user = await GetUserByIdAsync(userId);

            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            var roles = await _userManager.GetRolesAsync(user);

            return roles;
        }


        public async Task<UserDto> GetCurrentUserAsync(string userId)
        {
            var user = await GetUserByIdAsync(userId);

            if (user == null)
            {
                throw new KeyNotFoundException("GetCurrentUserAsync: Nie znaleziono użytkownika.");
            }
            DateTimeOffset? registerDate = ConvertToDateTimeOffset(user.RegisterDate);


            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                PasswordHash = user.PasswordHash,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount,
                FirstName = user.FirstName,
                LastName = user.LastName,
                NickName = user.NickName,
                RegisterDate = registerDate,
                LastTimeLogin = user.LastTimeLogin
            };
        }

        private DateTimeOffset? ConvertToDateTimeOffset(DateTime? dateTime)
        {
            if (dateTime == null)
            {
                return null;
            }

            // Ensure the DateTime is within valid range
            if (dateTime.Value < DateTime.MinValue || dateTime.Value > DateTime.MaxValue)
            {
                return null;
            }

            return new DateTimeOffset(dateTime.Value, TimeSpan.Zero);
        }

        public async Task<bool> DeleteUserByEmailAsync(string email)
        {
            try
            {
                var user = await _dataContext.Users
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return false;
                }

                _dataContext.Users.Remove(user);
                await _dataContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("DeleteUserByEmailAsync: Wystąpił problem podczas usuwania użytkownika:", ex);
            }
        }

        private async Task<Domain.Models.User> GetUserByIdAsync(string userId)
        {
            return await _dataContext.Users
                .Include(u => u.Posts)
                .Include(u => u.Payments)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }

}
