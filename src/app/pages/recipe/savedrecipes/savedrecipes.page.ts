import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './savedrecipes.page.html',
  styleUrls: ['./savedrecipes.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FooterComponent],
})
export class SavedRecipesPage implements OnInit {

  recipes: any[] = []
  id: string = "";

  constructor(private recipeService: RecipeService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.getTokenId();
  }

  getTokenId(): void {
    const userdatastring = localStorage.getItem('userdata');
    if (userdatastring) {
      const userdata = JSON.parse(userdatastring);
      this.id = userdata._id;
      this.getSavedRecipes();
    }
  }
  getSavedRecipes(): void {
    this.recipeService.getSavedRecipes(this.id)
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
}
