import { supabase } from "@/lib/supabase";

export interface Expense {
  id?: string;
  property_id: string;
  type: string;
  amount: number;
  expense_date: string;
  description?: string;
}

export const expenseService = {
  async getAll() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(expense: Omit<Expense, 'id'>) {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
