import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api';
  private router = inject(Router);
  private http = inject(HttpClient);

  // Signal qui stocke l'état de connexion
  isLoggedIn = signal(this.hasValidToken());

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          // Stocke uniquement le JWT brut
          localStorage.setItem('token', response.token);
          this.isLoggedIn.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  register(email: string, password: string, alias: string, userName: string, dateOfBirth: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, {
      email,
      password,
      alias,
      userName,
      dateOfBirth,
    });
  }

  getProfile(): Observable<any> {
    // Pas besoin de mettre le Bearer ici, l'intercepteur s'en charge
    return this.http.get(`${this.apiUrl}/auth/me`);
  }
}
