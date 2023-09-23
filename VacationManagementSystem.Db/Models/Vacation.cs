using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class Vacation
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression("^(sick|annual)$", ErrorMessage = "Property must be 'sick' or 'annual'.")]
        public string Type { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public string? Reason { get; set; }
        public bool IsApproved { get; set; }
        public string? EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
