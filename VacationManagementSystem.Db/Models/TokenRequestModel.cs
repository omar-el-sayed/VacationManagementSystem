using System.ComponentModel.DataAnnotations;

namespace VacationManagementSystem.Db.Models
{
    public class TokenRequestModel
    {
        [Required, StringLength(128)]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(256)]
        public string Password { get; set; } = string.Empty;
    }
}
