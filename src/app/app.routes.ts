import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/components/expense.component';
import { AddExpenseComponent } from './expense/components/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/components/edit-expense/edit-expense.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'expenses', component: ExpenseComponent},
    {path: 'add-expense', component: AddExpenseComponent},
    {path: 'edit-expense/:id', component: EditExpenseComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
