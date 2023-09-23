using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public interface IDepartmentRepo
    {
        Task<IEnumerable<Department>> GetAllAsync();
    }
}
