using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VacationManagementSystem.Db.Models;

namespace VacationManagementSystem.Db.Context
{
    public class ApplicationDbContext : IdentityDbContext<Employee>
    {
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Vacation> Vacations { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityUserLogin<string>>().HasNoKey();
            builder.Entity<IdentityUserRole<string>>().HasKey(e => new { e.UserId, e.RoleId });
            builder.Entity<IdentityUserToken<string>>().HasNoKey();
            new DbInitializer(builder, this).Seed();
        }
    }
}
