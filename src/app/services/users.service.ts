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
  getUser(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/?id=${id}`);
  }
  getFirstUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/first`);
  }
  getFirstSearchedUsers(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/firstsearch/?search=${search}`);
  }
  getSearchedUsers(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/find/?search=${search}`);
  }
  getNextUsers(skip: number = 0): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nextUsers/?skip=${skip}`);
  }
  getNextSearchedUsers(search: string, skip: number = 0): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nextUserSearch/?skip=${skip}&search=${search}`);
  }

  createUser(userData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }

  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userData);
  }
}
