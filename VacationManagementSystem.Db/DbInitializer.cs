using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Context;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db
{
    class DbInitializer
    {
        private readonly ModelBuilder _builder;
        private readonly ApplicationDbContext _context;

        public DbInitializer(ModelBuilder builder, ApplicationDbContext context)
        {
            _builder = builder;
            _context = context;
        }

        public void Seed()
        {
            _builder.Entity<Department>(a =>
            {
                a.HasData(new Department
                {
                    Id = 1,
                    Name = "Software Development",
                    Code = "SD"
                });
                a.HasData(new Department
                {
                    Id = 2,
                    Name = "Information Technology",
                    Code = "IT"
                });
                a.HasData(new Department
                {
                    Id = 3,
                    Name = "Human Resources",
                    Code = "HR"
                });
            });

            _builder.Entity<IdentityRole>(a =>
            {
                a.HasData(new IdentityRole
                {
                    Id = "32d929c2-2740-4a79-8a04-6234462c2e96",
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper(),
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                });
                a.HasData(new IdentityRole
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "User",
                    NormalizedName = "User".ToUpper(),
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                });
            });

            _builder.Entity<Employee>(a =>
            {
                a.HasData(new Employee
                {
                    Id = "673f1e40-23fc-4ca1-9317-553be38732a7",
                    UserName = "admin@admin.com",
                    NormalizedUserName = "admin@admin.com".ToUpper(),
                    Email = "admin@admin.com",
                    NormalizedEmail = "admin@admin.com".ToUpper(),
                    EmailConfirmed = true,
                    PasswordHash = "AQAAAAIAAYagAAAAEDjWvBH3YhUqptDaomlc0uj3Cjl7n+AX38kPPVxuMqJstQZsdJHf7WHeupcxlGLXIA==", // admin@123
                    SecurityStamp = "VCTV7GBERPI2DC22ZVSHWLRFJDIRWMK2",
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    FirstName = "Admin",
                    LastName = "User",
                    Address = "Cairo",
                    Salary = 10000,
                    BirthDate = DateTime.Now,
                    HireDate = DateTime.Now,
                    Balance = 21,
                    DepartmentId = 3
                });
            });

            _builder.Entity<IdentityUserRole<string>>(a =>
            {
                a.HasData(new IdentityUserRole<string>
                {
                    UserId = "673f1e40-23fc-4ca1-9317-553be38732a7",
                    RoleId = "32d929c2-2740-4a79-8a04-6234462c2e96"
                });
            });
        }
    }
}
