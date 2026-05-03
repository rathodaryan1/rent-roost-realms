import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService, Room } from "@/services/roomService";
import { toast } from "sonner";

export const useRooms = () => {
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomService.getAll,
  });

  const createRoomMutation = useMutation({
    mutationFn: roomService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add room");
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Room> }) =>
      roomService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update room");
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: roomService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete room");
    },
  });

  return {
    rooms,
    isLoading,
    error,
    createRoom: createRoomMutation.mutate,
    updateRoom: updateRoomMutation.mutate,
    deleteRoom: deleteRoomMutation.mutate,
    isCreating: createRoomMutation.isPending,
    isUpdating: updateRoomMutation.isPending,
    isDeleting: deleteRoomMutation.isPending,
  };
};
