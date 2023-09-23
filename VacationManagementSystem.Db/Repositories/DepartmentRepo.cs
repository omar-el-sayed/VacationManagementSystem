using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Context;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public class DepartmentRepo : IDepartmentRepo
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _context.Departments.AsNoTracking().ToListAsync();
        }
    }
}
