'use client'
import { Expense } from '../services/expenseService'

interface Props {
  expenses: Expense[]
  onDelete: (id: string) => void
}

export default function ExpenseTable({ expenses, onDelete }: Props) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8fafc', textAlign: 'left' }}>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
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
              <td style={{ padding: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'right' }}>
                ${Number(e.expense_amount).toFixed(2)}
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                <button 
                  onClick={() => onDelete(e.id!)} 
                  style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}