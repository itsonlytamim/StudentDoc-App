import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://localhost:7124/api/documents';

  constructor(private http: HttpClient) {}

  getAllDocuments(folderName: string, studentId: number): Observable<any> {
    const params = new HttpParams()
      .set('folderName', folderName)
      .set('studentId', studentId);

    return this.http.get(`${this.apiUrl}/${folderName}/${studentId}`, { params });
  }

  uploadDocument(file: File, description: string, studentId: number, folderName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    formData.append('description', description);
    formData.append('folderName', folderName);

    return this.http.post(`${this.apiUrl}/${folderName}/${studentId}`, formData);
  }

  updateDocument(documentId: number, newFile: File | null, updatedDescription: string, folderName: string): Observable<any> {
    const formData: FormData = new FormData();
    if (newFile) {
      formData.append('newFile', newFile, newFile.name);
    }
    formData.append('updatedDescription', updatedDescription);
    formData.append('folderName', folderName);
    
    return this.http.put(`${this.apiUrl}/${documentId}`, formData);
  }

  deleteDocument(documentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${documentId}`);
  }

  deleteAllDocumentsByStudentId(studentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAll/${studentId}`);
  }
  
  downloadDocument(documentId: number): Observable<Blob> {
    // Set the responseType to 'blob' to receive binary data
    return this.http.get(`${this.apiUrl}/download/${documentId}`, { responseType: 'blob' });
  }
}
