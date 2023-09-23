using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class Employee : IdentityUser
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        public string? Address { get; set; }
        [Required]
        public double Salary { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime HireDate { get; set; }
        public int Balance { get; set; }
        public int? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }
    }
}
