import { Link } from 'react-router-dom';
import { useTransactions, useStats } from '../hooks';
import { format } from 'date-fns';
import { Transaction } from '../types';

const HomePage = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const stats = useStats(transactions);

  // 按日期倒序排序
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部统计 */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">月度统计</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-80">收入</p>
            <p className="text-xl font-bold">¥{stats.totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">支出</p>
            <p className="text-xl font-bold">¥{stats.totalExpense.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">结余</p>
            <p className="text-xl font-bold">¥{stats.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* 交易列表 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">交易记录</h2>
        {sortedTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暂无记录</p>
        ) : (
          <div className="space-y-3">
            {sortedTransactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
              />
            ))}
          </div>
        )}
      </div>

      {/* 添加按钮 */}
      <Link
        to="/add"
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition-colors"
      >
        +
      </Link>
    </div>
  );
};

// 交易项组件
interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.type === 'income';

  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}¥{transaction.amount.toFixed(2)}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
            {transaction.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{transaction.note || '无备注'}</p>
        <p className="text-gray-400 text-xs mt-1">
          {format(new Date(transaction.date), 'yyyy-MM-dd')}
        </p>
      </div>
      <button
        onClick={() => onDelete(transaction.id)}
        className="text-gray-400 hover:text-red-600 transition-colors px-3"
      >
        删除
      </button>
    </div>
  );
};

export default HomePage;
