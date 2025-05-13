import { Category } from "./category";

export interface Expense {
    id: number,
    name: string,
    price: number,
    category: Category,
    account: string,
    date: Date
}
