import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class DetailPage  implements OnInit {

  recipe: any = {};
  id: string = ""; // window.location.href;

  constructor(private recipeService: RecipeService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.obtainId();
    this.getRecipe();
  }
  obtainId(): void {
    const indice = window.location.href.indexOf('recipe/');
    if (indice !== -1) {
      this.id = window.location.href.substring(indice + 'recipe/'.length);
    }
  }
  getRecipe(): void {
    this.recipeService.getRecipe(this.id)
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

}