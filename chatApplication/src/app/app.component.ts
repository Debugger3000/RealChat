import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet, HeaderComponent, ReactiveFormsModule],
  // templateUrl: './app.component.html',
  template: `

  <app-header/>
  <router-outlet/>
`
  
})
// styleUrl: './app.component.scss'
export class AppComponent {
  title = 'chatApplication';
}
