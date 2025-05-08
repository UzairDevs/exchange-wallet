"use client";

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  ChevronDown, 
  FileText 
} from 'lucide-react';

// Mock data for the transactions
const allTransactions = [
  { id: 1, type: 'received', amount: 250.00, from: 'John Smith', date: '2025-05-03', status: 'completed', description: 'Payment for services' },
  { id: 2, type: 'sent', amount: 120.50, to: 'Sarah Doe', date: '2025-05-02', status: 'completed', description: 'Monthly subscription' },
  { id: 3, type: 'received', amount: 450.00, from: 'Mike Johnson', date: '2025-05-01', status: 'pending', description: 'Project payment' },
  { id: 4, type: 'sent', amount: 75.25, to: 'Emma Wilson', date: '2025-04-30', status: 'completed', description: 'Dinner payment' },
  { id: 5, type: 'sent', amount: 185.75, to: 'Alex Brown', date: '2025-04-28', status: 'failed', description: 'Product purchase' },
  { id: 6, type: 'received', amount: 320.00, from: 'Lisa Taylor', date: '2025-04-26', status: 'completed', description: 'Consulting fee' },
  { id: 7, type: 'sent', amount: 45.99, to: 'Daniel White', date: '2025-04-25', status: 'completed', description: 'Online subscription' },
  { id: 8, type: 'received', amount: 1250.00, from: 'Corporate Inc.', date: '2025-04-22', status: 'completed', description: 'Contract payment' },
  { id: 9, type: 'sent', amount: 350.00, to: 'Thomas Green', date: '2025-04-20', status: 'pending', description: 'Investment share' },
  { id: 10, type: 'received', amount: 175.50, from: 'Jessica Lee', date: '2025-04-15', status: 'completed', description: 'Refund' },
];

// Transaction summary data
const transactionSummary = {
  totalSent: 777.49,
  totalReceived: 2445.50,
  pendingAmount: 800.00,
  totalTransactions: 10
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(allTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      (transaction.from && transaction.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.to && transaction.to.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.description && transaction.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    // Simple date filter implementation
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = transaction.date === today;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(transaction.date) >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = new Date(transaction.date) >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  return (
    <div className="flex-1 p-8 pt-28">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-500">View and manage all your transactions</p>
        </div>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>
      
      {/* Transaction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
          <h3 className="text-xl font-bold">{transactionSummary.totalTransactions}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">Total Sent</p>
          <h3 className="text-xl font-bold text-red-600">-${transactionSummary.totalSent.toFixed(2)}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">Total Received</p>
          <h3 className="text-xl font-bold text-green-600">+${transactionSummary.totalReceived.toFixed(2)}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">Pending Amount</p>
          <h3 className="text-xl font-bold text-yellow-600">${transactionSummary.pendingAmount.toFixed(2)}</h3>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isSearchFocused ? 'text-blue-500' : ''}`}>
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className={`w-full pl-10 pr-4 py-2 border ${isSearchFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="sent">Sent</option>
                  <option value="received">Received</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm bg-gray-50">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="hidden md:table-cell px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
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
                    <td className="hidden md:table-cell px-6 py-4 text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FileText size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No transactions found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredTransactions.length}</span> of{" "}
            <span className="font-medium">{transactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Transaction Tips Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-lg text-blue-800 mb-2">Transaction Tips</h3>
            <p className="text-blue-700 mb-3">
              Keep track of your transaction history to better manage your finances. You can export your transactions in various formats for your records or accounting purposes.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Export as CSV
              </button>
              <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}