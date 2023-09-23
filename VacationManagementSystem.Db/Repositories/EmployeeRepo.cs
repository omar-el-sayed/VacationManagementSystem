using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly UserManager<Employee> _userManager;

        public EmployeeRepo(UserManager<Employee> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<Employee?> UpdateAsync(Employee employee)
        {
            var result = await _userManager.UpdateAsync(employee);

            if (result.Succeeded)
                return employee;

            return null;
        }
    }
}
