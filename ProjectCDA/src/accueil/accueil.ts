import { Component, inject} from '@angular/core';
import { Auth } from '../service/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  private authService = inject(Auth);
  private http = inject(HttpClient);

  isLoggedIn = this.authService.isLoggedIn;
  data: any = null
  
}
