using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Context;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public class DashboardRepo : IDashboardRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Employee> _userManager;

        public DashboardRepo(ApplicationDbContext context, UserManager<Employee> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<DashboardModel> GetCountsAsync()
        {
            var dashboard = new DashboardModel();

            dashboard.EmployeesCount = await _userManager.Users.CountAsync();
            dashboard.DepartmentsCount = await _context.Departments.CountAsync();
            dashboard.VacationRequestsCount = await _context.Vacations.Where(v => !v.IsApproved).CountAsync();

            return dashboard;
        }

        public async Task<int> GetEmployeeCountsAsync(string id)
        {
            return await _context.Vacations
                .AsNoTracking()
                .Where(v => v.EmployeeId == id && v.StartDate.Year == DateTime.Now.Year && v.EndDate.Year == DateTime.Now.Year && !v.IsApproved)
                .CountAsync();
        }
    }
}
