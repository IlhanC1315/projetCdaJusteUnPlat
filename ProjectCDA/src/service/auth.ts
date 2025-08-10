import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/users';
  private router = inject(Router)
  isLoggedIn = signal(this.hasValidToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.isLoggedIn.set(true)
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private hasValidToken() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const playload = JSON.parse(atob(token.split('.')[1]));
      return playload.exp * 1000 > Date.now();
    } catch (err) {
      return false;
    }
  }

  register(email: string, password: string, alias: string, userName: string, dateOfBirth: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      email,
      password,
      alias,
      userName,
      dateOfBirth,
    });
  }
}
