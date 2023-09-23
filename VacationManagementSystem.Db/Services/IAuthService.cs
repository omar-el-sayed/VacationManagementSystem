using Microsoft.AspNetCore.Identity;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Services
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
        Task<AuthModel> GetTokenAsync(TokenRequestModel model);
        Task<List<IdentityRole>> GetAllRolesAsync();
        Task<string> AddRoleAsync(AddRoleModel model);
    }
}
