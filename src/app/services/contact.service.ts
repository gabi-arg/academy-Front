import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


export interface ContactForm {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  read?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ContactService {

   private apiUrl = 'http://localhost:5231/api/contact';
  constructor(private http: HttpClient) {

  }
  sendContactForm(data: ContactForm): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllMessages(): Observable<ContactForm[]> {
  return this.http.get<ContactForm[]>(this.apiUrl);
  }
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
