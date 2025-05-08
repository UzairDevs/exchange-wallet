"use client";

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, Users, Plus, Eye, EyeOff } from 'lucide-react';

// Mock data for the dashboard
const transactionData = [
  { name: 'Jan', sent: 4000, received: 2400 },
  { name: 'Feb', sent: 3000, received: 1398 },
  { name: 'Mar', sent: 2000, received: 5800 },
  { name: 'Apr', sent: 2780, received: 3908 },
  { name: 'May', sent: 1890, received: 4800 },
  { name: 'Jun', sent: 2390, received: 3800 },
];

const balanceHistory = [
  { date: 'Jan', balance: 2400 },
  { date: 'Feb', balance: 1398 },
  { date: 'Mar', balance: 5800 },
  { date: 'Apr', balance: 3908 },
  { date: 'May', balance: 4800 },
  { date: 'Jun', balance: 3800 },
];

const recentTransactions = [
  { id: 1, type: 'received', amount: 250.00, from: 'John Smith', date: '2025-05-03', status: 'completed' },
  { id: 2, type: 'sent', amount: 120.50, to: 'Sarah Doe', date: '2025-05-02', status: 'completed' },
  { id: 3, type: 'received', amount: 450.00, from: 'Mike Johnson', date: '2025-05-01', status: 'pending' },
  { id: 4, type: 'sent', amount: 75.25, to: 'Emma Wilson', date: '2025-04-30', status: 'completed' },
];

export default function Dashboard() {
  const [hideBalance, setHideBalance] = useState(false);
  
  return (
    <div className="flex-1 p-8 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's your financial overview</p>
      </div>
      
      {/* Balance Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold">
                    {hideBalance ? '••••••' : '$12,750.85'}
                  </h3>
                  <button 
                    onClick={() => setHideBalance(!hideBalance)} 
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {hideBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-green-100 px-2 py-1 rounded-full flex items-center">
              <ArrowUpRight className="text-green-600" size={14} />
              <span className="text-xs text-green-600 font-medium ml-1">+2.5%</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Plus size={16} className="mr-2" />
            Add Funds
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <CreditCard className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Month Income</p>
              <h3 className="text-2xl font-bold">{hideBalance ? '••••••' : '$4,250.50'}</h3>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Previous</p>
              <p className="font-medium">{hideBalance ? '••••••' : '$3,850.20'}</p>
            </div>
            <div className="bg-green-100 px-2 py-1 rounded-full flex items-center self-end">
              <ArrowUpRight className="text-green-600" size={14} />
              <span className="text-xs text-green-600 font-medium ml-1">+10.4%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Month Expenses</p>
              <h3 className="text-2xl font-bold">{hideBalance ? '••••••' : '$2,150.30'}</h3>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Previous</p>
              <p className="font-medium">{hideBalance ? '••••••' : '$2,540.80'}</p>
            </div>
            <div className="bg-green-100 px-2 py-1 rounded-full flex items-center self-end">
              <ArrowDownRight className="text-green-600" size={14} />
              <span className="text-xs text-green-600 font-medium ml-1">-15.4%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#4F46E5" />
                <Bar dataKey="received" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Balance History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={balanceHistory}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions Section */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-2 ${transaction.type === 'received' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'received' ? 
                          <ArrowDownRight className="text-green-600" size={16} /> : 
                          <ArrowUpRight className="text-red-600" size={16} />
                        }
                      </div>
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${transaction.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'received' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.from || transaction.to}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View All Transactions
          </button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 flex items-center justify-between hover:bg-blue-100 transition-colors cursor-pointer">
          <div>
            <h4 className="font-medium">Transfer Money</h4>
            <p className="text-sm text-gray-600 mt-1">Send money to anyone</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6 flex items-center justify-between hover:bg-purple-100 transition-colors cursor-pointer">
          <div>
            <h4 className="font-medium">Exchange Currency</h4>
            <p className="text-sm text-gray-600 mt-1">Convert between currencies</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <CreditCard className="text-purple-600" size={24} />
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-6 flex items-center justify-between hover:bg-amber-100 transition-colors cursor-pointer">
          <div>
            <h4 className="font-medium">View Analytics</h4>
            <p className="text-sm text-gray-600 mt-1">See detailed statistics</p>
          </div>
          <div className="bg-amber-100 p-3 rounded-lg">
            <TrendingUp className="text-amber-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}