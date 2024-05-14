import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:3333/recipes';
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  getSearchedRecipes(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/find/?search=${search}`);
  }
  getTopRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/top5`);
  }
  getFirstRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/first`);
  }
  getFirstSearchedRecipes(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/firstsearch/?search=${search}`);
  }
  getNextRecipes(skip: number = 0): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nextRecipes/?skip=${skip}`);
  }
  getNextSearchedRecipes(search: string, skip: number = 0): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nextRecipeSearch/?skip=${skip}&search=${search}`);
  }
}
