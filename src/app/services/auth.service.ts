import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
interface RegisterDto {
  username: string;
  password: string;
  email: string;
  role: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://academy-back-2.onrender.com/api/auth';


  constructor(private http: HttpClient,  private router: Router) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, dto);
  }
    logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}

