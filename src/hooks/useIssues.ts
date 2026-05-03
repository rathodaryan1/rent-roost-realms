import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { issueService, Issue } from "@/services/issueService";
import { toast } from "sonner";

export const useIssues = () => {
  const queryClient = useQueryClient();

  const { data: issues = [], isLoading, error } = useQuery({
    queryKey: ["issues"],
    queryFn: issueService.getAll,
  });

  const createIssueMutation = useMutation({
    mutationFn: issueService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success("Issue reported successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to report issue");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Issue['status'] }) =>
      issueService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success("Issue status updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  return {
    issues,
    isLoading,
    error,
    createIssue: createIssueMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    isCreating: createIssueMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
  };
};
