import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/recipe/home/home.page').then( m => m.HomePage)
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
    path: 'recipe/:recipe',
    loadComponent: () => import('./pages/recipe/detail/detail.page').then(m => m.DetailPage)
  },
  {
    path: 'people',
    loadComponent: () => import('./pages/user/users/users.page').then( m => m.UsersPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/user/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/user/register/register.page').then( m => m.RegisterPage)
  },  {
    path: 'login',
    loadComponent: () => import('./pages/user/login/login.page').then( m => m.LoginPage)
  },

];
