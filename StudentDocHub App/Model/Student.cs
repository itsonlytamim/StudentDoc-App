using System.ComponentModel.DataAnnotations;

namespace StudentDocHub_App.Model
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string StudentId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string UserType { get; set; }

        public ICollection<Document> Documents { get; set; }
    }
}

