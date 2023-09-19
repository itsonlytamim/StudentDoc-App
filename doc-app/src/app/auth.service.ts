import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7124/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private studentIdSubject = new BehaviorSubject<number >(0);


  constructor(private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getStudentId():number {
    return this.studentIdSubject.value;
  }
  
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/Auth/login`, body, { headers }).pipe(
      map((response: any) => {
        this.isLoggedInSubject.next(true);
        this.studentIdSubject.next(response.studentId); // Set the studentId
        response=this.studentIdSubject.value;
        return response;
      })
    );
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}

