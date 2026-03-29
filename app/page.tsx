'use client'

// 1. ALL IMPORTS MUST BE HERE AT THE TOP
import { useEffect, useState } from 'react'
import { expenseService, Expense } from '../services/expenseService'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'
import CsvImport from '../components/CsvImport' // Correctly placed import

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const loadData = async () => {
    try {
      const data = await expenseService.getExpenses()
      setExpenses(data)
    } catch (err) {
      console.error("Load error:", err)
    }
  }

  const handleAdd = async (newExpense: Expense) => {
    try {
      await expenseService.addExpense(newExpense)
      loadData()
    } catch (err) {
      alert("Error saving expense")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return
    try {
      await expenseService.deleteExpense(id)
      loadData()
    } catch (err) {
      alert("Delete failed")
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const total = expenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0)

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      {/* Header Section */}
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>
        Vriddhi Expense Tracker
      </h1>
      <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '25px', fontWeight: 'normal' }}>
        Enter Expense Details
      </h3>

      {/* --- PHASE 3: CSV IMPORT COMPONENT --- */}
      <CsvImport onUploadComplete={loadData} />

      {/* --- MANUAL ENTRY FORM --- */}
      <ExpenseForm onAdd={handleAdd} />

      {/* --- SUMMARY & TABLE --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Recent Activity</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>TOTAL EXPENSES</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>${total.toFixed(2)}</div>
        </div>
      </div>

      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  )
}