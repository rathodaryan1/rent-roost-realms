import { supabase } from "@/lib/supabase";

export interface Room {
  id?: string;
  property_id: string;
  room_number: string;
  floor?: string;
  type: string;
  rent_amount: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export const roomService = {
  async getAll() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, properties(name)')
      .order('room_number', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async create(room: Omit<Room, 'id'>) {
    const { data, error } = await supabase
      .from('rooms')
      .insert([room])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Room>) {
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
