using StudentDocHub_App.Model;

namespace StudentDocHub_App.Interfaces
{
    public interface IDocumentRepository
    {
        IEnumerable<Document> GetAllDocuments(string folderName, int studentId);
        void UploadDocument(IFormFile file, string description, int studentId, string folderName);
        void UpdateDocument(int documentId, IFormFile file, string description, string folderName);
        void DeleteDocument(int documentId);
        void DeleteAllDocumentsByStudentId(int studentId);
        Document DownloadDocumentById(int documentId);
    }

}
