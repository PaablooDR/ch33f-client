import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3333/users';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createUser(userData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }
}
