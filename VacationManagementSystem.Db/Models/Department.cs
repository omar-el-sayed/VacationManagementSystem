using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class Department
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Code { get; set; } = string.Empty;
        public virtual ICollection<Employee> Employees { get; set; } = default!;
    }
}
