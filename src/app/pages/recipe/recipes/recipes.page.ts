import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class RecipesPage implements OnInit {
  recipes: any[] = []
  noMoreRecipes: boolean = false;
  numRecipes: number = 0;
  skip: number = 0;
  search: string = "";
  loadingData: boolean = false;

  constructor(private recipeService: RecipeService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.getFirstRecipes();
    this.getNumRecipes();
  }

  startPrintingEvery5Seconds(): void {
    setInterval(() => {
      console.log("skip: ", this.skip);
      console.log("num: ", this.numRecipes);
      console.log("boolean: ", this.noMoreRecipes);
    }, 5000);
  }
  
  
  onInputRecipe(event: any) {
    this.search = event.target.value;
    if(this.search === "") {
      this.enableInfiniteScroll();
      this.noMoreRecipes = false;
      this.skip = 0;
      this.getFirstRecipes();
    } else {
      this.enableInfiniteScroll();
      this.noMoreRecipes = false;
      this.skip = 0;
      this.getNumRecipes();
      this.getFirstSearchedRecipes();
    }
    // console.log('Se ha escrito en el ion-searchbar:', this.search);
  }

  getFirstRecipes(): void {
    this.recipeService.getFirstRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
    this.skip = this.recipes.length;
  }

  getFirstSearchedRecipes(): void {
    this.recipeService.getFirstSearchedRecipes(this.search)
      .subscribe(recipes => {
        this.recipes = recipes;
      });
    this.skip = this.recipes.length;
  }

  getNumRecipes(): void {
    if(this.search === "") {
      this.recipeService.getAllRecipes()
      .subscribe(recipes => {
        this.numRecipes = recipes.length;
      });
    } else {
      console.log('getNumRecipes');
      this.recipeService.getSearchedRecipes(this.search)
      .subscribe(recipes => {
        this.numRecipes = recipes.length;
      });
    }
    
  }

  loadData( event: any ) {
    if (this.noMoreRecipes) {
      event.target.disabled = true;
      return;
    }
    this.skip = this.recipes.length;
    if(this.search === "") {
      this.recipeService.getNextRecipes(this.skip).subscribe(nextRecipes => {
        if (this.skip >= this.numRecipes) {
          this.noMoreRecipes = true;
          event.target.disabled = true;
        } else {
          this.recipes = this.recipes.concat(nextRecipes); 
          event.target.complete(); 
        }
      });
    } else {
      this.recipeService.getNextSearchedRecipes(this.search, this.skip).subscribe(nextRecipes => {
        if (this.skip >= this.numRecipes) {
          this.noMoreRecipes = true;
          event.target.disabled = true;
        } else {
          this.recipes = this.recipes.concat(nextRecipes); 
          event.target.complete(); 
        }
      });
    }
  }
  enableInfiniteScroll() {
    const infiniteScroll = document.querySelector('ion-infinite-scroll');
    if (infiniteScroll) {
      infiniteScroll.disabled = false;
    }
  }
}
