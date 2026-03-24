import { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { getTransactions, addTransaction as addTransactionToStorage, deleteTransaction as deleteTransactionFromStorage } from '../utils/storage';

// 交易记录管理 Hook
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 初始化时从 LocalStorage 加载数据
  useEffect(() => {
    const stored = getTransactions();
    setTransactions(stored);
  }, []);

  // 添加交易记录
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = addTransactionToStorage(transaction);
    setTransactions(prev => [...prev, newTransaction]);
    return newTransaction;
  };

  // 删除交易记录
  const deleteTransaction = (id: string) => {
    deleteTransactionFromStorage(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
  };
};
