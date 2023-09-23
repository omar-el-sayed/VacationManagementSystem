using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public interface IDashboardRepo
    {
        Task<DashboardModel> GetCountsAsync();
        Task<int> GetEmployeeCountsAsync(string id);
    }
}
