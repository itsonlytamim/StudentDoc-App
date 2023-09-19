using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StudentDocHub_App.Interfaces;
using StudentDocHub_App.Model;

namespace StudentDocHub_App.Data.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly AppDbContext _context;

        public DocumentRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Document> GetAllDocuments(string folderName, int studentId)
        {
            return _context.Documents
                .Where(d => d.FolderName == folderName && d.StudentId == studentId)
                .ToList();
       
        }

        public void UploadDocument(IFormFile file, string description, int studentId, string folderName)
        {
            if (file == null || file.Length == 0)
            {
                throw new Exception("Invalid file");
            }

            // Check if a folder with the same name exists for this student
            bool folderExists = _context.Documents.Any(d => d.StudentId == studentId && d.FileName == file.FileName);

            if (folderExists)
            {
                throw new Exception("A folder with the same name already exists.");
            }

            string contentType = GetContentType(file.FileName);

            byte[] content;
            using (var memoryStream = new System.IO.MemoryStream())
            {
                file.CopyTo(memoryStream);
                content = memoryStream.ToArray();
            }

            var document = new Document
            {
                FileName = file.FileName,
                ContentType = contentType,
                Content = content,
                Description = description,
                StudentId = studentId,
                FolderName = folderName,
                DateUploaded = DateTime.UtcNow
            };

            _context.Documents.Add(document);
            _context.SaveChanges();
        }

        public void UpdateDocument(int documentId, IFormFile newFile, string updatedDescription, string folderName)
        {
            var document = _context.Documents.Find(documentId);

            if (document != null)
            {
                bool documentExists = _context.Documents
                .Any(d => d.StudentId == document.StudentId && d.FileName == newFile.FileName);

                if (documentExists)
                {
                    throw new Exception("A document with the same name already exists.");
                }
                if (newFile != null && newFile.Length > 0)
                {
                    string contentType = GetContentType(newFile.FileName);

                    byte[] content;
                    using (var memoryStream = new System.IO.MemoryStream())
                    {
                        newFile.CopyTo(memoryStream);
                        content = memoryStream.ToArray();
                    }

                    document.FileName = newFile.FileName;
                    document.ContentType = contentType;
                    document.Content = content;
                }
                    document.Description = updatedDescription;
                    document.FolderName = folderName;
                


                _context.SaveChanges();
            }
        }

        public void DeleteDocument(int documentId)
        {
            var document = _context.Documents.Find(documentId);

            if (document != null)
            {
                _context.Documents.Remove(document);
                _context.SaveChanges();
            }
        }
        public void DeleteAllDocumentsByStudentId(int studentId)
        {
            var documentsToDelete = _context.Documents.Where(d => d.StudentId == studentId);
            _context.Documents.RemoveRange(documentsToDelete);
            _context.SaveChanges();
        }

        public Document DownloadDocumentById(int documentId)
        {
            try
            {
                var document = _context.Documents.FirstOrDefault(d => d.Id == documentId);

                return document;
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur during retrieval
                throw new Exception("Error while retrieving the document by ID", ex);
            }
        }

        private string GetContentType(string fileName)
        {
            string fileExtension = System.IO.Path.GetExtension(fileName).ToLowerInvariant();

            switch (fileExtension)
            {
                case ".pdf":
                    return "application/pdf";
                case ".docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                default:
                    return "application/octet-stream";
            }
        }
    }
}
