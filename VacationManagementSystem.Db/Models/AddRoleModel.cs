using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class AddRoleModel
    {
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public string RoleName { get; set; } = string.Empty;
    }
}
