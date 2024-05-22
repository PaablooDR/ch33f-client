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
  getUserRecipes(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/?id=${id}`);
  }
  getSearchedRecipes(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/find/?search=${search}`);
  }
  getRecipe(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recipe/?id=${id}`);
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
  sumVisitToRecipe(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/visits/?id=${id}`);
  }
  createRecipe(recipeData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, recipeData);
  }
  getSavedRecipes(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/saved/?id=${id}`);
  }
}