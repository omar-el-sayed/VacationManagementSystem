using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class RegisterModel
    {
        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;
        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;
        [Required, StringLength(128)]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(256)]
        public string Password { get; set; } = string.Empty;
        public string? Address { get; set; }
        public double Salary { get; set; }
        public int Balance { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime HireDate { get; set; }
        public int? DepartmentId { get; set; }
    }
}
