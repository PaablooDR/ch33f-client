import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormBuilder,ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.page.html',
  styleUrls: ['./addrecipe.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, ReactiveFormsModule, FooterComponent],
})
export class AddrecipePage implements OnInit {

  ingredientNumber: number = 0;
  stepNumber: number = 0;
  ingredients: number[] = [];
  steps: number[] = []
  formRecipe: FormGroup;
  // selectedFiles: FileList | null = null;
  selectedFile: File | null = null;

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) {
    addIcons({ home, restaurant, people, person });
    this.formRecipe = this.formBuilder.group({
      title: ['', [Validators.minLength(5), Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.minLength(5), Validators.required, Validators.maxLength(100)]],
      photo: [null],
      ingredientNumber: ['', [Validators.min(1)]],
      stepNumber: ['', [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit($event: any) {
    if (this.formRecipe.valid) {

      const formData = new FormData();

      formData.append('title', this.formRecipe.value.title);
      formData.append('description', this.formRecipe.value.description);
      formData.append('ingredientNumber', this.formRecipe.value.ingredientNumber);
      formData.append('stepNumber', this.formRecipe.value.stepNumber);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      // if(this.selectedFiles) {
      //   formData.append('photo', this.selectedFiles[0]);
      //   for (let i = 1; i < this.selectedFiles.length; i++) {
      //     formData.append(`stepImg${i}`, this.selectedFiles[i]);
      //   }
      // }

      for (let i = 0; i < this.formRecipe.value.ingredientNumber; i++) {
        let ingredientControl = this.formRecipe.get(`ingredient${i}`);
        if(ingredientControl !== null) {
          formData.append(`ingredient${i}`, ingredientControl.value);
        }
      }
      for (let i = 0; i < this.formRecipe.value.stepNumber; i++) {
        let stepTitleControl = this.formRecipe.get(`steptitle${i}`);
        if(stepTitleControl !== null) {
          formData.append(`steptitle${i}`, stepTitleControl.value);
        }
        let stepDescriptionControl = this.formRecipe.get(`stepdescription${i}`);
        if(stepDescriptionControl !== null) {
          formData.append(`stepdescription${i}`, stepDescriptionControl.value);
        }
      }
      const userdatastring = localStorage.getItem('userdata');
      if (userdatastring) {
        const userdata = JSON.parse(userdatastring);
        formData.append('user', userdata._id);
      } else {
        console.error('Not user found');
      }

      this.recipeService.createRecipe(formData).subscribe(
        (response) => {
          console.log('Receta creada exitosamente:', response);
          const userdatastring = localStorage.getItem('userdata');
          if(userdatastring) {
            const userdata = JSON.parse(userdatastring);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Error al crear la receta:', error);
        }
      );

    }
  }

  generateIngredients() {
    let cantI = this.formRecipe.value.ingredientNumber;
    if(cantI > 15) {
      cantI = 15;
    }
    this.ingredients = Array.from({ length: cantI }, (_, i) => i + 1);
    for (let i = 0; i < cantI; i++) {
      if (!this.formRecipe.contains(`ingredient${i}`)) {
        this.formRecipe.addControl(`ingredient${i}`, new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5)
        ]));
      }
    }
  }
  generateSteps() {
    let cantS = this.formRecipe.value.stepNumber;
    if(cantS > 15) {
      cantS = 15;
    }
    this.steps = Array.from({ length: cantS }, (_, i) => i + 1);
    for (let i = 0; i < cantS; i++) {
      if (!this.formRecipe.contains(`steptitle${i}`) || !this.formRecipe.contains(`stepdescription${i}`)) {
        this.formRecipe.addControl(`steptitle${i}`, new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5)
        ]));
        this.formRecipe.addControl(`stepdescription${i}`, new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5)
        ]));
      }
    }
  }

  onFileSelected(event: any) {
    // const input = event.target as HTMLInputElement;
    // if (input.files) {
    //   this.selectedFiles = input.files;
    // }
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log(this.selectedFile);
  }

  checkError(controlName: string, errorName: string) {
    return this.formRecipe.get(controlName)?.hasError(errorName) && this.formRecipe.get(controlName)?.touched;
  }
}
