import { Transaction } from '../types';

const STORAGE_KEY = 'transactions';

// 从 LocalStorage 获取所有交易记录
export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse transactions:', error);
    return [];
  }
};

// 保存交易记录到 LocalStorage
export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

// 添加新的交易记录
export const addTransaction = (transaction: Omit<Transaction, 'id'>): Transaction => {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  transactions.push(newTransaction);
  saveTransactions(transactions);
  return newTransaction;
};

// 删除交易记录
export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  saveTransactions(filtered);
};
