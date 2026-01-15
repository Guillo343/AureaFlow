// src/models/dashboard.ts

export interface DashboardData {
  user: DashboardUser;
  period: DashboardPeriod;
  totals: DashboardTotals;
  expenses: DashboardExpenses;
  incomes: DashboardIncomes;
  savings: DashboardSavings;
  goals: DashboardGoals[];
  trendData?: DashboardTrendPoint[]; 
}
/* Sub Models */
export interface DashboardUser {
  id: string;
  name: string;
}

export interface DashboardPeriod {
  month: number; // 1 - 12
  year: number;
}
export interface DashboardTotals {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
export interface DashboardExpenses {
  total: number;
  fixed: number;
  variable: number;
  byCategory: ExpenseCategorySummary[];
}
export interface ExpenseCategorySummary {
  category: string;
  total: number;
}
export interface DashboardIncomes {
  total: number;
}
export interface DashboardSavings {
  current: number;
  target: number;
  progress: number; // 0 - 100
}
export interface DashboardGoals {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progress: number; // 0 - 100
}
/* ----------------------------- Trend Chart ---------------------------- */
export interface DashboardTrendPoint {
  date: string;
  income: number;
  expenses: number;
}
/* -------------------------- Raw Summary (DTO) -------------------------- */
export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;

  fixedExpenses?: number;
  variableExpenses?: number;

  expensesByCategory: {
    category: string;
    total: number;
  }[];

  goals: {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    progress: number;
  }[];
}
