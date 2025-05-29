import { Component, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { MaterialModules } from '../../shared/material.shared';
import { CommonModule } from '@angular/common';
import { Expense } from '../../expense';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../category';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-expense',
  imports: [MaterialModules, FormsModule, CommonModule],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
  standalone: true
})
export class ExpenseComponent implements OnInit{
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  private router = inject(Router);
  private expenseService = inject(ExpenseService);
  private categoryService = inject(CategoryService);
  expenses: Signal<Expense[]> = this.expenseService.expensesList;
  category: Signal<Category[]> = this.categoryService.categoriesList;
  accounts: Array<String> = [];
  categories:Array<String> = [];
  selectedAccount: String = "";
  selectedCategory: String = "";
  startDate: Date | undefined;
  endDate: Date | undefined;
  displayedColumns: string[] = ['name', 'price', 'category', 'account', 'date', 'actions'];
  dataSource = new MatTableDataSource<Expense>();


  ngOnInit(): void {
      this.getAccounts();
      this.getCategories();
      this.filteredExpenses();
  }

  openMenu(){
    this.trigger.openMenu();
  }

  getAccounts() {
    return this.expenses().forEach((expense) => {
      if (!this.accounts.includes(expense.account)){
        this.accounts.push(expense.account);
      }
    })
  }

  getCategories() {
    return this.expenses().forEach((expense) => {
      if (!this.categories.includes(expense.category)) 
      {
        this.categories.push(expense.category);
      }
    })
  }

  resetDate() {
    this.startDate = undefined;
    this.endDate = undefined;
  }

  filteredExpenses(){
      const filtered = this.expenses().filter(exp => {
        const Category = this.selectedCategory ? exp.category === this.selectedCategory : true;
        const Account = this.selectedAccount ? exp.account === this.selectedAccount : true;
        const StartDate = this.startDate ? new Date(exp.date) >= new Date(this.startDate) : true;
        const EndDate = this.endDate ? new Date(exp.date) <= new Date(this.endDate) : true;

        return Category && Account && StartDate && EndDate
      });

      this.dataSource = new MatTableDataSource(filtered);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'date'){
          return new Date(item.date);
        }

        return (item as any)[property];
      };
  }

  editExpense(id: number) {
    this.router.navigate(['/edit-expense', id]);
  }

  deleteExpense(id: number){
    this.expenseService.deleteExpense(id);
  }
  
}
