import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories = signal<Category[]>([
    {
      id: 1,
      name: 'Moey',
      symbol: ''
    },
    {
      id: 2,
      name: 'Carteira',
      symbol: ''
    },
    {
      id: 3,
      name: 'CGD',
      symbol: ''
    }
  ])

  readonly categoriesList = computed(() => this.categories());

  constructor() { }

  getCategories(): Category[] {
      return this.categories();
  }

  getCategoryName(name: string): Category | undefined {
    return this.categories().find(category => category.name === name);
  }

  addCategory(category: Category){
    this.categories.update(prev => [...prev, category]);
  }

  deleteCategory(name: string){
    this.categories.update(prev => prev.filter(cat => cat.name !== name));
  }
}
