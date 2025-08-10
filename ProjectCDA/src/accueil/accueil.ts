import { Component, inject} from '@angular/core';
import { Auth } from '../service/auth';
import { HttpClient } from '@angular/common/http';
import { Header } from '../header/header';

@Component({
  selector: 'app-accueil',
  imports: [Header],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  private authService = inject(Auth);
  private http = inject(HttpClient);

  isLoggedIn = this.authService.isLoggedIn;
  data: any = null
  
}
