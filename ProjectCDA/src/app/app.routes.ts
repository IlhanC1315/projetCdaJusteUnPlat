import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { PageWelcome } from '../page-welcome/page-welcome';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'welcome', component: PageWelcome },
    { path: '', redirectTo: '/welcome', pathMatch: 'full'}
];
