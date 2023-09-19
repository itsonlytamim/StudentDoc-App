import { Component, OnInit ,Renderer2  } from '@angular/core';
import { DocumentService } from '../document.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface Document {
  id: number;
  fileName: string;
  contentType: string;
  content: Blob; // You can use 'string' or 'Blob' based on your needs
  description: string;
  studentId: number;
  folderName: string;
  dateUploaded: Date;
}

@Component({
  templateUrl: './other-essentials.component.html',
  styleUrls: ['./other-essentials.component.css']
})
export class OtherEssentialsComponent implements OnInit {
  documents: Document[] = [];
  folderName: string = 'other-essentials'; // Replace with the folder name you want to fetch
  studentId!: number; // Initialize with the appropriate student ID
  successMessage: string = '';
  errorMessage: string = '';
  fileToUpload: File | null = null;
  description: string = ''; // Added description property
  updatedFile: File | null = null; // Added updatedFile property
  selectedDocumentId: number | null = null; // Initialize it as null
  updatedDescription: string = ''; 


  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2 // Inject Renderer2

  ) {}

  ngOnInit() {
    const studentId = this.authService.getStudentId(); // Call the getStudentId function
    if (studentId !== null) {
      this.studentId = studentId;
      this.loadDocuments();
    }
  }

  loadDocuments() {
    this.documentService.getAllDocuments(this.folderName, this.studentId).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }
 
  onUpdatedFileSelected(event: any) {
    this.updatedFile = event.target.files[0];
  }


  uploadDocument(description: string) {
    if (!this.fileToUpload) {
      this.errorMessage = 'Please select a file to upload.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.documentService.uploadDocument(this.fileToUpload, description, this.studentId, this.folderName).subscribe(
      () => {
        this.successMessage = 'Successfully Uploaded';
        this.loadDocuments();
        this.fileToUpload = null; // Clear the selected file
        this.description = ''; // Clear the description field after successful upload


      },
      (error) => {
        console.log('Error uploading document:', error);
      }
    );
  }

  updateDocument(document: Document): void {
    // Set the selectedDocumentId to the ID of the clicked document
    this.selectedDocumentId = document.id;
    // Set the description to the current description of the document
    this.updatedDescription=document.description;
    this.errorMessage = '';
    this.successMessage = '';
  }
  
  submitUpdatedDocument(): void {
    // Check if a document is selected
    if (this.selectedDocumentId !== null) {
      // Call the updateDocument function with the selected document's ID
      this.documentService.updateDocument(
        this.selectedDocumentId,
        this.updatedFile,
        this.updatedDescription,
        this.folderName
      ).subscribe(
        () => {
          this.loadDocuments();
          // Reset selectedDocumentId and updatedFile
          this.selectedDocumentId = null;
          this.updatedFile = null;
          // Clear the description field after successful update
          this.updatedDescription = '';
          this.successMessage = 'Successfully Updated';
        },
        (error) => {
          console.error('Error updating document:', error);
        }
      );
    }
  }
  
  
  deleteDocument(documentId: number) {
    this.errorMessage = '';
    this.successMessage = '';
    this.documentService.deleteDocument(documentId).subscribe(
      () => {
        this.successMessage = 'Successfully Deleted';
        this.loadDocuments();
      },
      (response) => {

        console.error('Error deleting document:', response);
      }
    );
  }
  
  deleteAllDocuments() {
    this.errorMessage = '';
    this.successMessage = '';
    if (confirm('Are you sure you want to delete all documents for this student?')) {
      this.documentService.deleteAllDocumentsByStudentId(this.studentId).subscribe(
        () => {
          this.documents = []; // Clear the documents array
          this.successMessage = 'All documents deleted successfully';
          this.loadDocuments();
        },
        (error) => {
          console.error('Error deleting all documents:', error);
        }
      );
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  downloadDocument(doc: Document) {
    this.errorMessage = '';
    this.successMessage = '';
    this.documentService.downloadDocument(doc.id).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: doc.contentType });

        const url = window.URL.createObjectURL(blob);

        const a = window.document.createElement('a');
        a.href = url;
        a.download = doc.fileName;
        window.document.body.appendChild(a);

        a.click();

        window.document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
}



}
