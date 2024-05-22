import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person, exit } from 'ionicons/icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class FooterComponent  implements OnInit {

  id: string = "";

  constructor(public userService: UsersService) {
    addIcons({ home, restaurant, people, person, exit });
  }

  ngOnInit() {
    this.getTokenId();
  }
  getTokenId(): void {
    const userdatastring = localStorage.getItem('userdata');
    if (userdatastring) {
      const userdata = JSON.parse(userdatastring);
      this.id = userdata._id;
    }
  }
  logOut(): void {
    localStorage.clear();
  }
}
