// 交易记录类型
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note: string;
  date: string;
}

// 月度统计类型
export interface MonthlyStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
