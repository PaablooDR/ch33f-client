import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { UsersService } from 'src/app/services/users.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person, heart, heartOutline } from 'ionicons/icons';
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FooterComponent],
})
export class DetailPage  implements OnInit {

  recipe: any = {};
  id: string = "";
  saved = false;

  constructor(private recipeService: RecipeService, public usersService: UsersService) {
    addIcons({ home, restaurant, people, person, heart, heartOutline });
  }

  ngOnInit(): void {
    this.obtainId();
    this.getRecipe();
    this.sumVisitToRecipe();
    this.getIsSaved();
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
      console.log(this.recipe);
  }

  sumVisitToRecipe(): void {
    this.recipeService.sumVisitToRecipe(this.id)
    .subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  async getIsSaved(): Promise<void> {
    const userdatastring = localStorage.getItem('userdata');
    if (userdatastring) {
      const userdata = JSON.parse(userdatastring);
      if(userdata != null) {
        const userId = userdata._id;
        this.usersService.isSaved(userId, this.id)
        .subscribe((isSaved: boolean) => {
          this.saved = isSaved;
        }, error => {
          console.error('Error checking if recipe is saved:', error);
        });
      }
    }
  }

  async changeSaved(): Promise<void> {
    const userdatastring = localStorage.getItem('userdata');
    if (userdatastring) {
      const userdata = JSON.parse(userdatastring);
      if(userdata != null) {
        const userId = userdata._id;
        this.usersService.changeSaved(userId, this.id)
        .subscribe(() => {
          this.saved = !this.saved;
        }, error => {
          console.error('Error changing saved status:', error);
        });
      }
    } else {
      console.error('No user ID found in localStorage');
    }
  }

}