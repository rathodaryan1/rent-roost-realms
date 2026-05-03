import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useTenants() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tenants", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenants").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useRooms() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["rooms", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms").select("*").order("room_number");
      if (error) throw error;
      return data;
    },
  });
}

export function usePayments() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["payments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments").select("*").order("payment_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useExpenses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["expenses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expenses").select("*").order("expense_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useProperties() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["properties", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}