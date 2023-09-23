using Microsoft.Extensions.DependencyInjection;
using VacationManagementSystem.Db.Repositories;
using VacationManagementSystem.Db.Services;

namespace VacationManagementSystem.Db
{
    public static class DbModuleDependencies
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IDepartmentRepo, DepartmentRepo>();
            services.AddScoped<IEmployeeRepo, EmployeeRepo>();
            services.AddScoped<IVacationRepo, VacationRepo>();
            services.AddScoped<IDashboardRepo, DashboardRepo>();
            return services;
        }
    }
}
