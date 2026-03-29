'use client'

import { useEffect, useState } from 'react'
import { expenseService, Expense } from '../services/expenseService'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'
import CsvImport from '../components/CsvImport'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const loadData = async () => {
    const data = await expenseService.getExpenses()
    setExpenses(data)
  }

  const handleAdd = async (newExpense: Expense) => {
    await expenseService.addExpense(newExpense)
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return
    await expenseService.deleteExpense(id)
    loadData()
  }

  useEffect(() => { loadData() }, [])

  // Filtering Logic
  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.expense_vendor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (e.note?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || e.expense_category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTotal = filteredExpenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>Vriddhi Expense Tracker</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Business Finance Dashboard</p>

      <CsvImport onUploadComplete={loadData} />
      <ExpenseForm onAdd={handleAdd} />

      {/* --- THE FILTER BAR (Must be here because searchTerm is here) --- */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <div style={{ flex: 2 }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>SEARCH VENDOR</label>
          <input 
            placeholder="Type to filter..." 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>CATEGORY</label>
          <select 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Supplies">Supplies</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px' }}>
        <h2 style={{ fontSize: '20px' }}>Recent Activity</h2>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>DISPLAYED TOTAL: </span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0070f3' }}>${filteredTotal.toFixed(2)}</span>
        </div>
      </div>

      <ExpenseTable expenses={filteredExpenses} onDelete={handleDelete} />
    </div>
  )
}