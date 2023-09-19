using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentDocHub_App.Model
{
    public class Document
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FileName { get; set; }
        [Required]
        public string ContentType { get; set; }
        public byte[] Content { get; set; }
        public string Description { get; set; }
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public Student Student { get; set; }
        public string FolderName { get; set; }
        public DateTime DateUploaded { get; set; } 

        public Document()
        {
            DateUploaded = DateTime.UtcNow;
        }

    }

}
