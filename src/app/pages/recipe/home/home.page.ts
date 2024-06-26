import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FooterComponent],
})

export class HomePage implements OnInit {
   recipes: any[] = [];

  constructor(private recipeService: RecipeService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.getTopRecipes();
  }

  getTopRecipes(): void {
    this.recipeService.getTopRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
}
