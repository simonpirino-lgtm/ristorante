import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  view: string = 'dishes';

  dishes: any[] = [];
  categories: any[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  newDish = {
    name: '',
    description: '',
    price: null
  };

  selectedCategories: { [key:number]: number } = {};

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.api.getDishes().subscribe(data => {
      this.dishes = data;
      this.cdr.detectChanges();
    });

    this.api.getCategories().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });
  }

  addDish() {
    this.errorMessage = '';
    this.successMessage = '';

    this.api.addDish(this.newDish).subscribe({
      next: () => {
        this.newDish = { name:'', description:'', price:null };
        this.successMessage = 'Piatto inserito con successo!';
        this.loadAll();
      },
      error: (err) => {
        this.errorMessage = err.error?.errore || 'Errore inserimento piatto';
        this.cdr.detectChanges();
      }
    });
  }

  deleteDish(id:number) {
    this.api.deleteDish(id).subscribe(() => this.loadAll());
  }

  addCategoryToDish(dishId:number) {
    this.errorMessage = '';
    this.successMessage = '';

    const categoryId = this.selectedCategories[dishId];

    if(!categoryId) {
      this.errorMessage = 'Seleziona una categoria';
      return;
    }

    this.api.addDishCategory(dishId, categoryId).subscribe({
      next: () => {
        this.successMessage = 'Categoria aggiunta';
        this.loadAll();
      },
      error: err => {
        this.errorMessage = err.error?.errore || 'Errore associazione';
        this.cdr.detectChanges();
      }
    });
  }
}