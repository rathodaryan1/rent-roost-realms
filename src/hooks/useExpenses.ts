import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseService, Expense } from "@/services/expenseService";
import { toast } from "sonner";

export const useExpenses = () => {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: expenseService.getAll,
  });

  const createExpenseMutation = useMutation({
    mutationFn: expenseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense recorded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to record expense");
    },
  });

  return {
    expenses,
    isLoading,
    error,
    createExpense: createExpenseMutation.mutate,
    isCreating: createExpenseMutation.isPending,
  };
};
