import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService, Tenant } from "@/services/tenantService";
import { toast } from "sonner";

export const useTenants = () => {
  const queryClient = useQueryClient();

  const { data: tenants = [], isLoading, error } = useQuery({
    queryKey: ["tenants"],
    queryFn: tenantService.getAll,
  });

  const createTenantMutation = useMutation({
    mutationFn: tenantService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add tenant");
    },
  });

  const updateTenantMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Tenant> }) =>
      tenantService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update tenant");
    },
  });

  const deleteTenantMutation = useMutation({
    mutationFn: tenantService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant removed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove tenant");
    },
  });

  return {
    tenants,
    isLoading,
    error,
    createTenant: createTenantMutation.mutate,
    updateTenant: updateTenantMutation.mutate,
    deleteTenant: deleteTenantMutation.mutate,
    isCreating: createTenantMutation.isPending,
    isUpdating: updateTenantMutation.isPending,
    isDeleting: deleteTenantMutation.isPending,
  };
};
