'use client'
import Papa from 'papaparse'
import { expenseService } from '../services/expenseService'

interface Props {
  onUploadComplete: () => void
}

export default function CsvImport({ onUploadComplete }: Props) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // Map Found.com headers to your Database columns
          const formattedData = results.data.map((row: any) => ({
            expense_date: row.Date,
            expense_vendor: row.Description,
            expense_amount: parseFloat(row.Amount.replace(/[^0-9.-]+/g, "")), // Cleans '$' signs
            expense_category: row.Category,
            tag: row.Tags,
            note: row.Note
          }))

          await expenseService.addBulkExpenses(formattedData)
          alert(`Successfully imported ${formattedData.length} expenses!`)
          onUploadComplete()
        } catch (err) {
          console.error(err)
          alert("Error importing CSV. Check console for details.")
        }
      }
    })
  }

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '2px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>
        <strong>Bulk Import:</strong> Drop your Found.com CSV here
      </p>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload}
        style={{ fontSize: '12px' }}
      />
    </div>
  )
}