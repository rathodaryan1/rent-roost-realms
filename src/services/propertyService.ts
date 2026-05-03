import { supabase } from "@/lib/supabase";

export interface Property {
  id: string;
  owner_id: string;
  name: string;
  address?: string;
  city?: string;
  created_at: string;
}

export const propertyService = {
  async getAll() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(property: Omit<Property, 'id' | 'owner_id' | 'created_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('properties')
      .insert([{ ...property, owner_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
