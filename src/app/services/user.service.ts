import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  picture: string | null;
  name: string | null;
  email: string | null;
  gender: string | null;
  phone: string | null;
  street: string | null;
  city: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://randomuser.me/api';
  private seed = 'devextreme';
  private results = 100;

  constructor(private http: HttpClient) {}

  getUsers(isActiveOnly?: boolean): Observable<User[]> {
    const filtersFromStorage = JSON.parse(localStorage.getItem('filters') || '{}');

    let inc = 'name,picture' +
    (filtersFromStorage['gender'] ? ',gender' : '') +
    (filtersFromStorage['street'] || filtersFromStorage['city'] ? ',location' : '') +
    (filtersFromStorage['email'] ? ',email' : '') +
    (filtersFromStorage['phone'] ? ',phone' : '');

    let url = `${this.apiUrl}/?seed=${this.seed}&results=${this.results}${inc ? `&inc=${inc}` : ''}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response.results.map((result: any, index: number) => {
          const { name, picture, email, gender, phone, location } = result;
          const user: User = {
            id: index + 1,
            picture: picture ? picture.thumbnail : null,
            name: name ? `${name.first} ${name.last}` : null,
            email: email || null,
            gender: gender || null,
            phone: phone || null,
            street: filtersFromStorage?.street && location?.street ? `${location.street.number} ${location.street.name}` : null,
            city: filtersFromStorage?.city && location?.city ? location.city : null,
          };
          return user;
        });
      })
    );
  }
}
