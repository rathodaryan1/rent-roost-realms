import { supabase } from "@/lib/supabase";

export interface Booking {
  id?: string;
  tenant_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date?: string;
  status: 'active' | 'completed' | 'cancelled' | 'confirmed' | 'pending';
  security_deposit?: number;
}

export const bookingService = {
  async getAll() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tenants(full_name, phone), rooms(room_number, rent_amount)')
      .order('check_in_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(booking: Omit<Booking, 'id'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
