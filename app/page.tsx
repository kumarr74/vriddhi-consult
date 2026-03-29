'use client'
import { useEffect, useState } from 'react'
import { expenseService, Expense } from '../services/expenseService'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const loadData = async () => {
    const data = await expenseService.getExpenses()
    setExpenses(data)
  }

  const handleAdd = async (newExpense: Expense) => {
    try {
      await expenseService.addExpense(newExpense)
      loadData()
    } catch (err) { alert("Error saving") }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return
    await expenseService.deleteExpense(id)
    loadData()
  }

  useEffect(() => { loadData() }, [])

  const total = expenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0)

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Vriddhi Expense Tracker</h1>
      <h3 style={{ color: '#666', marginBottom: '25px' }}>Enter Expense Details</h3>
      
      <ExpenseForm onAdd={handleAdd} />

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