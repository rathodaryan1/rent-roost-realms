import { supabase } from "@/lib/supabase";

export interface Tenant {
  id?: string;
  full_name: string;
  phone: string;
  email?: string;
  room_id?: string;
  join_date: string;
  status: 'active' | 'notice' | 'inactive';
  owner_id?: string;
  rent_amount?: number;
}

export const tenantService = {
  async getAll() {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tenants')
      .select('*, bookings(*, rooms(*))')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(tenant: Omit<Tenant, 'id' | 'owner_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('tenants')
      .insert([{ ...tenant, owner_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Tenant>) {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
