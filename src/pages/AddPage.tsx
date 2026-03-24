import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTransactions } from '../hooks';
import { format } from 'date-fns';

const CATEGORIES = {
  expense: ['餐饮', '交通', '购物', '娱乐', '居住', '医疗', '其他'],
  income: ['工资', '奖金', '兼职', '投资', '其他'],
};

const AddPage = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('请输入有效金额');
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      type,
      category,
      note,
      date,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← 返回
          </Link>
          <h1 className="text-lg font-semibold">添加记录</h1>
        </div>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* 类型选择 */}
        <div className="bg-white p-2 rounded-lg shadow">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory(CATEGORIES.expense[0]);
              }}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                type === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              支出
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory(CATEGORIES.income[0]);
              }}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                type === 'income'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              收入
            </button>
          </div>
        </div>

        {/* 金额输入 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            金额
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full text-3xl font-bold border-b-2 border-gray-200 focus:border-blue-600 outline-none py-2"
            autoFocus
          />
        </div>

        {/* 分类选择 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            分类
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES[type].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-md text-sm transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 日期选择 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            日期
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 备注输入 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            备注（可选）
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="添加备注..."
            rows={3}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          保存
        </button>
      </form>
    </div>
  );
};

export default AddPage;
