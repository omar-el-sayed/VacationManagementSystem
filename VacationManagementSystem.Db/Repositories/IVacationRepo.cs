using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public interface IVacationRepo
    {
        Task<IEnumerable<Vacation>> GetAllAsync();
        Task<Vacation?> GetByIdAsync(int id);
        Task<IEnumerable<Vacation>> GetUserVacationsAsync(string id);
        Task<int> CheckEmployeeBalance(string id);
        Task<Vacation> RequestVacation(Vacation vacation);
        Task<Vacation> ApproveVacation(Vacation vacation);
    }
}
