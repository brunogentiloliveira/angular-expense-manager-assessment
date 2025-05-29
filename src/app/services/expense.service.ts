import { Injectable, signal, computed } from '@angular/core';
import { Expense } from '../expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenses = signal<Expense[]>([
    {
      id: 1,
      name: 'Continente',
      price: 75.30,
      category: 'Supermercados',
      account: 'Moey',
      date: new Date('2025-04-27')
    },
    {
      id: 2,
      name: 'Galp',
      price: 50.00,
      category: 'Combustivel',
      account: 'Carteira',
      date: new Date('2025-02-25')
    },
    {
      id: 3,
      name: 'Netflix',
      price: 11.99,
      category: 'Subscricoes',
      account: 'Moey',
      date: new Date('2025-03-13')
    },
    {
      id: 4,
      name: 'Ginasio',
      price: 24.99,
      category: 'Desporto',
      account: 'CGD',
      date: new Date('2025-01-15')
    },
    {
      id: 5,
      name: 'Prendas',
      price: 30.00,
      category: 'Prendas',
      account: 'Moey',
      date: new Date('2024-12-20')
    },
    {
      id: 6,
      name: 'Pingo Doce',
      price: 42.15,
      category: 'Supermercados',
      account: 'CGD',
      date: new Date('2025-01-08')
    },
    {
      id: 7,
      name: 'Uber',
      price: 12.90,
      category: 'Transportes',
      account: 'Moey',
      date: new Date('2025-01-15')
    },
    {
      id: 8,
      name: 'Spotify',
      price: 6.99,
      category: 'Subscricoes',
      account: 'Moey',
      date: new Date('2025-01-01')
    },
    {
      id: 9,
      name: 'Fnac',
      price: 89.00,
      category: 'Tecnologia',
      account: 'Carteira',
      date: new Date('2025-01-20')
    },
    {
      id: 10,
      name: 'Zara',
      price: 55.49,
      category: 'Roupa',
      account: 'CGD',
      date: new Date('2025-02-03')
    },
    {
      id: 11,
      name: 'IKEA',
      price: 103.20,
      category: 'Casa',
      account: 'Moey',
      date: new Date('2025-02-11')
    },
    {
      id: 12,
      name: 'Continente',
      price: 67.85,
      category: 'Supermercados',
      account: 'CGD',
      date: new Date('2025-02-25')
    },
    {
      id: 13,
      name: 'Decathlon',
      price: 29.99,
      category: 'Desporto',
      account: 'Carteira',
      date: new Date('2025-03-04')
    },
    {
      id: 14,
      name: 'NOS Cinema',
      price: 15.00,
      category: 'Lazer',
      account: 'Moey',
      date: new Date('2025-03-15')
    },
    {
      id: 15,
      name: 'Amazon',
      price: 48.65,
      category: 'Online',
      account: 'Moey',
      date: new Date('2025-03-29')
    }
  ]);

  readonly expensesList = computed(() => this.expenses());

  constructor() { }

  getExpenses(): Expense[] {
    return this.expenses();
  }

  getExpenseById(id: number): Expense | undefined {
    return this.expenses().find(expense => expense.id === id);
  }

  addExpense(expense: Expense) {
    this.expenses.update(prev => [...prev, expense]);
  }

  updateExpense(expense: Expense) {
    this.expenses.update(prev => 
      prev.map(exp => exp.id === expense.id ? expense : exp)
    );
  }

  deleteExpense(id: number) {
    console.log("Expense to be deleted");
    this.expenses.update(prev => prev.filter(exp => exp.id !== id));
  }

}
