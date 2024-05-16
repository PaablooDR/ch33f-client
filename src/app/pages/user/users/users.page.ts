import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, restaurant, people, person } from 'ionicons/icons'
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FooterComponent],
})
export class UsersPage implements OnInit {

  users: any[] = []
  noMoreUsers: boolean = false;
  numUsers: number = 0;
  skip: number = 0;
  search: string = "";
  loadingData: boolean = false;

  constructor(private userService: UsersService) {
    addIcons({ home, restaurant, people, person })
  }

  ngOnInit(): void {
    this.getFirstUsers();
    this.getNumUsers();
  }

  startPrintingEvery5Seconds(): void {
    setInterval(() => {
      console.log("skip: ", this.skip);
      console.log("num: ", this.numUsers);
      console.log("boolean: ", this.noMoreUsers);
    }, 5000);
  }
  
  
  onInputUsers(event: any) {
    this.search = event.target.value;
    if(this.search === "") {
      this.enableInfiniteScroll();
      this.noMoreUsers = false;
      this.skip = 0;
      this.getFirstUsers();
    } else {
      this.enableInfiniteScroll();
      this.noMoreUsers = false;
      this.skip = 0;
      this.getNumUsers();
      this.getFirstSearchedUsers();
    }
    console.log('Se ha escrito en el ion-searchbar:', this.search);
  }

  getFirstUsers(): void {
    this.userService.getFirstUsers()
      .subscribe(users => {
        this.users = users;
      });
    this.skip = this.users.length;
  }

  getFirstSearchedUsers(): void {
    this.userService.getFirstSearchedUsers(this.search)
      .subscribe(users => {
        this.users = users;
      });
    this.skip = this.users.length;
  }

  getNumUsers(): void {
    if(this.search === "") {
      this.userService.getAllUsers()
      .subscribe(users => {
        this.numUsers = users.length;
      });
    } else {
      this.userService.getSearchedUsers(this.search)
      .subscribe(users => {
        this.numUsers = users.length;
      });
    }
    
  }

  loadData( event: any ) {
    if (this.noMoreUsers) {
      event.target.disabled = true;
      return;
    }
    this.skip = this.users.length;
    if(this.search === "") {
      this.userService.getNextUsers(this.skip).subscribe(nextUsers => {
        if (this.skip >= this.numUsers) {
          this.noMoreUsers = true;
          event.target.disabled = true;
        } else {
          this.users = this.users.concat(nextUsers); 
          event.target.complete(); 
        }
      });
    } else {
      this.userService.getNextSearchedUsers(this.search, this.skip).subscribe(nextUsers => {
        if (this.skip >= this.numUsers) {
          this.noMoreUsers = true;
          event.target.disabled = true;
        } else {
          this.users = this.users.concat(nextUsers); 
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
