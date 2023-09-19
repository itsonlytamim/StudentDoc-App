using System.ComponentModel.DataAnnotations;

namespace StudentDocHub_App.Controllers.ViewModels
{
    public class LoginRequestModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
