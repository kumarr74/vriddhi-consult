'use client'
import { useState } from 'react'
import { Expense } from '../services/expenseService'

interface Props {
  onAdd: (expense: Expense) => void
}

export default function ExpenseForm({ onAdd }: Props) {
  const [formData, setFormData] = useState({
    date: '', description: '', amount: '', category: '', tag: '', note: ''
  })

  const handleSubmit = () => {
    if (!formData.date || !formData.description || !formData.amount) {
      alert("Fill required fields")
      return
    }
    onAdd({
      expense_date: formData.date,
      expense_vendor: formData.description,
      expense_amount: Number(formData.amount),
      expense_category: formData.category,
      tag: formData.tag,
      note: formData.note
    })
    setFormData({ date: '', description: '', amount: '', category: '', tag: '', note: '' })
  }

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>DATE</label>
          <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                 value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>DESCRIPTION</label>
          <input placeholder="Vendor" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                 value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>AMOUNT ($)</label>
          <input type="number" step="0.01" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                 value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>CATEGORY</label>
          <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="">-- Select --</option>
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Supplies">Supplies</option>
          </select>
        </div>
        <button onClick={handleSubmit} style={{ gridColumn: 'span 2', padding: '16px', background: '#0070f3', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Save Expense
        </button>
      </div>
    </div>
  )
}