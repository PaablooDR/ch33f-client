import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;
  selectedFile: File | null = null;

  constructor(private userService: UsersService) {
    addIcons({ home, restaurant, people, person });

    this.formRegister = new FormGroup({
      name: new FormControl(null, [
        Validators.minLength(5),
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      description: new FormControl(null, [
        Validators.minLength(5),
        Validators.required,
        Validators.maxLength(100)
      ]),
      password: new FormControl(null, [
        Validators.minLength(5),
        Validators.required,
        Validators.maxLength(50)
      ]),
      photo: new FormControl(null)
    });
  }

  onSubmit($event: any) {
    if (this.formRegister.valid) {
      const formData = new FormData();
      formData.append('name', this.formRegister.value.name);
      formData.append('email', this.formRegister.value.email);
      formData.append('description', this.formRegister.value.description);
      formData.append('password', this.formRegister.value.password);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }

      console.log('Valores del formulario:', this.formRegister.value);

      this.userService.createUser(formData).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente:', response);
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );

      console.log('Formulario enviado:', formData);
    }

  }

  checkError(control: string, error: string) {
    return this.formRegister.get(control)?.hasError(error) && this.formRegister.get(control)?.touched
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  ngOnInit() {
  }

}
