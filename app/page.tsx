'use client'

import { useEffect, useState } from 'react'
import { expenseService, Expense } from '../services/expenseService'

export default function Home() {
  // 1. STATE - Using an object for the form to keep it clean
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    tag: '',
    note: ''
  })

  // 2. LOGIC ACTIONS (Calling our Service)
  const loadData = async () => {
    try {
      const data = await expenseService.getExpenses()
      setExpenses(data)
    } catch (err) {
      console.error("Load error:", err)
    }
  }

  const handleAdd = async () => {
    const { date, description, amount } = formData
    if (!date || !description || !amount) {
      alert("Please fill in Date, Description, and Amount.")
      return
    }

    try {
      await expenseService.addExpense({
        expense_date: date,
        expense_vendor: description,
        expense_amount: Number(amount),
        expense_category: formData.category,
        tag: formData.tag,
        note: formData.note
      })
      // Reset form
      setFormData({ date: '', description: '', amount: '', category: '', tag: '', note: '' })
      loadData()
    } catch (err) {
      alert("Failed to save expense.")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return
    try {
      await expenseService.deleteExpense(id)
      loadData()
    } catch (err) {
      alert("Delete failed.")
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const total = expenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0)

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>
        Vriddhi Expense Tracker
      </h1>
      <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '25px', fontWeight: 'normal' }}>
        Enter Expense Details
      </h3>

      {/* --- INPUT FORM SECTION --- */}
      <div style={{ 
        background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>DATE</label>
            <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                   value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>DESCRIPTION</label>
            <input placeholder="Vendor or item" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                   value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>AMOUNT ($)</label>
            <input type="number" step="0.01" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                   value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>CATEGORY</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', boxSizing: 'border-box' }} 
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="">-- Select --</option>
              <option value="Software">Software</option>
              <option value="Equipment">Equipment</option>
              <option value="Marketing">Marketing</option>
              <option value="Travel">Travel</option>
              <option value="Meals">Meals</option>
              <option value="Supplies">Supplies</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>TAGS</label>
            <input placeholder="Project / Label" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                   value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '8px', display: 'block' }}>NOTE</label>
            <input placeholder="Additional info" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                   value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
          </div>

          <button onClick={handleAdd} style={{ 
            gridColumn: 'span 2', padding: '16px', marginTop: '10px', background: '#0070f3', 
            color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px'
          }}>
            Save Expense
          </button>
        </div>
      </div>

      {/* --- RECENT ACTIVITY TABLE --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Recent Activity</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>TOTAL EXPENSES</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>${total.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px' }}>Description</th>
              <th style={{ padding: '15px' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontSize: '14px' }}>{e.expense_date}</td>
                <td style={{ padding: '15px', fontSize: '14px', fontWeight: '500' }}>{e.expense_vendor}</td>
                <td style={{ padding: '15px', fontSize: '14px', color: '#64748b' }}>{e.expense_category}</td>
                <td style={{ padding: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'right' }}>${Number(e.expense_amount).toFixed(2)}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => handleDelete(e.id!)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}