import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Bed, 
  Calendar, 
  Edit, 
  Plus, 
  Trash2, 
  Loader2,
  MoreVertical
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRooms } from "@/hooks/useRooms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/services/propertyService";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const roomSchema = z.object({
  room_number: z.string().min(1, "Room number is required"),
  type: z.string().min(1, "Room type is required"),
  rent_amount: z.coerce.number().min(1, "Rent must be positive"),
  status: z.enum(["available", "occupied", "maintenance"]),
  property_id: z.string().min(1, "Property is required"),
});

type RoomFormValues = z.infer<typeof roomSchema>;

const Availability = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { rooms, isLoading, createRoom, deleteRoom, isCreating } = useRooms();
  
  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: propertyService.getAll,
  });

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      room_number: "",
      type: "Single",
      rent_amount: 0,
      status: "available",
      property_id: properties[0]?.id || "",
    },
  });

  const onSubmit = (values: RoomFormValues) => {
    createRoom(values, {
      onSuccess: () => {
        setIsDialogOpen(false);
        form.reset();
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'occupied': return 'bg-red-50 text-red-600 border-red-100';
      case 'maintenance': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Room Inventory</h1>
          <p className="text-slate-500 mt-1">Manage your property rooms and availability.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Configure the details for the new room unit.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="property_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Property</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl h-12">
                            <SelectValue placeholder="Select a property" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {properties.map((property: any) => (
                            <SelectItem key={property.id} value={property.id}>
                              {property.name}
                            </SelectItem>
                          ))}
                          {properties.length === 0 && (
                            <SelectItem value="none" disabled>Please create a property first</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="room_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number / Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Room 101" {...field} className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Double">Double</SelectItem>
                            <SelectItem value="Triple">Triple</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rent_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rent (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating} className="rounded-xl">
                    {isCreating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Room
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Rooms</p>
              <p className="text-2xl font-bold text-slate-900">{rooms.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Bed className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Available</p>
              <p className="text-2xl font-bold text-slate-900">
                {rooms.filter((r: any) => r.status === 'available').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Occupied</p>
              <p className="text-2xl font-bold text-slate-900">
                {rooms.filter((r: any) => r.status === 'occupied').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Occupancy</p>
              <p className="text-2xl font-bold text-slate-900">
                {rooms.length > 0 ? Math.round((rooms.filter((r: any) => r.status === 'occupied').length / rooms.length) * 100) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-2xl" />
          ))
        ) : rooms.length > 0 ? (
          rooms.map((room: any) => (
            <Card key={room.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl group bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">{room.room_number}</CardTitle>
                    <CardDescription>{room.type} Room</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="h-5 w-5 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" /> Edit Room
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                        onClick={() => {
                          if(confirm("Delete this room?")) deleteRoom(room.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`font-bold ${getStatusColor(room.status)}`} variant="outline">
                    {room.status.toUpperCase()}
                  </Badge>
                  <span className="text-lg font-bold text-slate-900">₹{room.rent_amount}/mo</span>
                </div>
                
                <div className="pt-4 border-t border-slate-50 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl border-slate-200">
                    View Details
                  </Button>
                  <Button className="flex-1 rounded-xl">
                    Change Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="space-y-4">
              <div className="h-20 w-20 bg-slate-100 rounded-3xl mx-auto flex items-center justify-center">
                <Bed className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No rooms found</h3>
              <p className="text-slate-500">Get started by adding your first room unit.</p>
              <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl font-bold px-8">
                Add Room
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Availability;