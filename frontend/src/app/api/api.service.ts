import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dishUrl = 'http://localhost:3000/api/dishes';
  private categoryUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  getDishes() {
    return this.http.get<any[]>(this.dishUrl);
  }

  addDish(dish: any) {
    return this.http.post(this.dishUrl, dish);
  }

  deleteDish(id: number) {
    return this.http.delete(`${this.dishUrl}/${id}`);
  }

  getCategories() {
    return this.http.get<any[]>(this.categoryUrl);
  }

  addDishCategory(dishId: number, categoryId: number) {
    return this.http.post(`${this.dishUrl}/${dishId}/categories`, {
      category_id: categoryId
    });
  }
}