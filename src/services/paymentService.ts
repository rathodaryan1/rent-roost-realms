import { supabase } from "@/lib/supabase";

export interface Payment {
  id?: string;
  booking_id?: string;
  tenant_id: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  payment_date: string;
  payment_method?: string;
}

export const paymentService = {
  async getAll() {
    const { data, error } = await supabase
      .from('payments')
      .select('*, tenants(full_name)')
      .order('payment_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(payment: Omit<Payment, 'id'>) {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
