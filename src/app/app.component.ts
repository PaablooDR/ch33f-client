import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const hostname = window.location.hostname;
    if (hostname === 'admin.ch33f.net') {
      this.router.navigateByUrl('/admin/home');
    }
  }
}
