using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Repositories
{
    public interface IEmployeeRepo
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(string id);
        Task<Employee?> UpdateAsync(Employee employee);
    }
}
