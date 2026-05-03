import { supabase } from "@/lib/supabase";

export interface Issue {
  id?: string;
  tenant_id: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created_at?: string;
}

export const issueService = {
  async getAll() {
    const { data, error } = await supabase
      .from('issues')
      .select('*, tenants(full_name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(issue: Omit<Issue, 'id'>) {
    const { data, error } = await supabase
      .from('issues')
      .insert([issue])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: Issue['status']) {
    const { data, error } = await supabase
      .from('issues')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
