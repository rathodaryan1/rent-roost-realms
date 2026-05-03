import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService, Booking } from "@/services/bookingService";
import { toast } from "sonner";

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: bookingService.getAll,
  });

  const createBookingMutation = useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking confirmed");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create booking");
    },
  });

  return {
    bookings,
    isLoading,
    error,
    createBooking: createBookingMutation.mutate,
    isCreating: createBookingMutation.isPending,
  };
};
