import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(private userService: UsersService, private router: Router) {
    addIcons({ home, restaurant, people, person });

    this.formLogin = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  onSubmit($event: any) {
    if (this.formLogin.valid) {
      const loginData = this.formLogin.value;

      this.userService.loginUser(loginData).subscribe(
        (response) => {
          console.log('Usuario logeado exitosamente:', response);
          localStorage.setItem('token_ch33f', response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al logear usuario:', error);
        }
      );
    }
  }

  checkError(control: string, error: string) {
    return this.formLogin.get(control)?.hasError(error) && this.formLogin.get(control)?.touched
  }

  ngOnInit() {
  }

}
