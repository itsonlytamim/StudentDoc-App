using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentDocHub_App.Interfaces;
using StudentDocHub_App.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;

namespace StudentDocHub_App.Controllers
{
    [Route("api/documents")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IWebHostEnvironment _environment;
        private int studentId;

        public DocumentController(IDocumentRepository documentRepository, IWebHostEnvironment environment)
        {
            _documentRepository = documentRepository;
            _environment = environment;
        }

        // GET: api/documents

        [HttpGet("{folderName}/{studentId}")]
        public IActionResult GetAllDocuments(string folderName, int studentId)
        {
            try
            {
                IEnumerable<Document> documents = _documentRepository.GetAllDocuments(folderName, studentId);
                return Ok(documents);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST: api/documents
        [HttpPost("{folderName}/{studentId}")]
        public IActionResult UploadDocument([FromForm] IFormFile file, [FromForm] string description, [FromRoute] int studentId, [FromRoute] string folderName)
        {
            try

            {
                this.studentId = studentId;
                // Call the repository to upload the document
                _documentRepository.UploadDocument(file, description, studentId, folderName);

                return Ok(new { Message = "Document uploaded successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT: api/documents/{documentId}
        [HttpPut("{documentId}")]
        public IActionResult UpdateDocument(int documentId, [FromForm] IFormFile newFile, [FromForm] string updatedDescription, [FromForm] string folderName)
        {
            try
            {
                // Call the repository to update the document
                _documentRepository.UpdateDocument(documentId, newFile, updatedDescription, folderName);

                return Ok(new { Message = "Document updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/documents/{documentId}
        [HttpDelete("{documentId}")]
        public IActionResult DeleteDocument(int documentId)
        {
            try
            {
                _documentRepository.DeleteDocument(documentId);
                return Ok(new { Message = "Document deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/documents/deleteAll/{studentId}
        [HttpDelete("deleteAll/{studentId}")]
        public IActionResult DeleteAllDocumentsByStudentId(int studentId)
        {
            try
            {
                _documentRepository.DeleteAllDocumentsByStudentId(studentId);
                return Ok(new { Message = "All documents deleted successfully for you" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET: api/documents/download/{documentId}
        [HttpGet("download/{documentId}")]
        public IActionResult DownloadDocument(int documentId)
        {
            try
            {
                // Call the repository to get the document by ID
                var document = _documentRepository.DownloadDocumentById(documentId);

                if (document == null)
                {
                    return NotFound(new { Message = "Document not found" });
                }

                // Set the content type based on the document's content type
                var contentType = document.ContentType;

                // Set the content disposition to trigger a download with the original filename
                var contentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = document.FileName
                };

                Response.Headers.Add("Content-Disposition", contentDisposition.ToString());
                Response.Headers.Add("Content-Type", contentType);

                // Return the document content as a file download
                return File(document.Content, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
