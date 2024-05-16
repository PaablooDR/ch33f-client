import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FooterComponent],
})
export class ProfilePage implements OnInit {

  user: any = {};
  recipes: any[] = [];
  id: string = ""; 
  
  constructor(private userService: UsersService, private recipeService: RecipeService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.obtainId();
    this.getUser();
  }
  obtainId(): void {
    const indice = window.location.href.indexOf('profile/');
    if (indice !== -1) {
      this.id = window.location.href.substring(indice + 'profile/'.length);
    }
  }
  getUser(): void {
    this.userService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
      });
    this.getUserRecipes();
  }
  getUserRecipes(): void {
    this.recipeService.getUserRecipes(this.id)
      .subscribe(recipes => {
        this.recipes = recipes;
      });
      console.log(this.recipes);
  }

}
