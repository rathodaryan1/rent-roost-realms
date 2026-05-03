import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService, Payment } from "@/services/paymentService";
import { toast } from "sonner";

export const usePayments = () => {
  const queryClient = useQueryClient();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: paymentService.getAll,
  });

  const createPaymentMutation = useMutation({
    mutationFn: paymentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Payment recorded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to record payment");
    },
  });

  return {
    payments,
    isLoading,
    error,
    createPayment: createPaymentMutation.mutate,
    isCreating: createPaymentMutation.isPending,
  };
};
