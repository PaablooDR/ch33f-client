import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/user/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'admin/home',
    loadComponent: () => import('./pages/admin/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipe/recipes/recipes.page').then( m => m.RecipesPage)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/user/users/users.page').then( m => m.UsersPage)
  },
];
