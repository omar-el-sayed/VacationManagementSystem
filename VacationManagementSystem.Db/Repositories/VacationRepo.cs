using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Context;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public class VacationRepo : IVacationRepo
    {
        private readonly ApplicationDbContext _context;

        public VacationRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vacation>> GetAllAsync()
        {
            return await _context.Vacations.AsNoTracking().Where(v => !v.IsApproved).Include("Employee").ToListAsync();
        }

        public async Task<Vacation?> GetByIdAsync(int id)
        {
            return await _context.Vacations.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id && !v.IsApproved);
        }

        public async Task<IEnumerable<Vacation>> GetUserVacationsAsync(string id)
        {
            return await _context.Vacations.AsNoTracking().Where(v => v.EmployeeId == id && v.IsApproved).Include("Employee").ToListAsync();
        }

        public async Task<int> CheckEmployeeBalance(string id)
        {
            int vacationDays = 0;
            var vacations = await _context.Vacations
                .Where(v => v.EmployeeId == id && v.StartDate.Year == DateTime.Now.Year && v.EndDate.Year == DateTime.Now.Year && v.IsApproved)
                .ToListAsync();

            if (vacations is null || vacations.Count == 0)
                return vacationDays;

            foreach (var vacation in vacations)
            {
                TimeSpan difference = vacation.EndDate - vacation.StartDate;
                vacationDays += difference.Days + 1;
            }

            return vacationDays;
        }

        public async Task<Vacation> RequestVacation(Vacation vacation)
        {
            await _context.Vacations.AddAsync(vacation);
            await _context.SaveChangesAsync();

            return vacation;
        }

        public async Task<Vacation> ApproveVacation(Vacation vacation)
        {
            _context.Vacations.Update(vacation);
            await _context.SaveChangesAsync();

            return vacation;
        }
    }
}
