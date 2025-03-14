import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { type WritableSignal } from '@angular/core';


@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet, HeaderComponent, ReactiveFormsModule],
  // templateUrl: './app.component.html',
  template: `

@if (this.isAuthSignal()) {
  <app-header/>
  <router-outlet/>
}
@else {
  <router-outlet/>
}

  
  
`
  
})
// styleUrl: './app.component.scss'
export class AppComponent implements OnInit{
  isAuth = inject(LoginService)
  title = 'chatApplication';
  public isAuthSignal = signal(false);



signalRender(state: boolean){
  this.isAuthSignal.set(state);


}

//run when component is initiated...
ngOnInit(): void {
  // this.todoService.getToDoApi().pipe(catchError((err) => {
  //   console.log('Error Caught:',err);
  //   throw err;
  // }))
  // .subscribe((todos) => {
  //   this.todoItems.set(todos);
  // });
  // const isAuthSignal = signal(false);
  // this.isAuthenticated = isAuthSignal;
  this.isAuth.isAuthenticated().subscribe(isAuthState => {
    console.log("auth state is: ", isAuthState.isAuthenticated);
    this.signalRender(isAuthState.isAuthenticated);
  });
  console.log("App component has been loaded...")
}
}
