import { useMemo } from 'react';
import { Transaction, MonthlyStats } from '../types';

// 统计 Hook - 计算月度收支
export const useStats = (transactions: Transaction[]) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const stats: MonthlyStats = useMemo(() => {
    // 筛选当月数据
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // 计算总收入和总支出
    const totalIncome = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions, currentMonth, currentYear]);

  return stats;
};
