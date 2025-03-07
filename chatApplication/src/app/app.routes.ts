import { Routes } from '@angular/router';
import { AboutComponent } from './routes/about/about.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent},
    // {
    //     path: '',
    //     component: HomeComponent,
    //     pathMatch: 'full'
    // },
    { path: 'home', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    // { path: '**', component: NotFoundComponent }
    {
        path: 'api/user',
        redirectTo: '/api/user',
        pathMatch: 'full'
    },
    {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full'
    },
];
