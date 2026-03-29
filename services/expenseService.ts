import { supabase } from '../lib/supabase'

export interface Expense {
  id?: string
  expense_date: string
  expense_vendor: string
  expense_amount: number
  expense_category: string
  tag?: string
  note?: string
}

export const expenseService = {
  // GET all expenses
  async getExpenses() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // ADD an expense
  async addExpense(expense: Expense) {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
    
    if (error) throw error
    return data
  },

  // DELETE an expense
  async deleteExpense(id: string) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}