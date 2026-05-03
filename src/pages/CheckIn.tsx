import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Calendar, Home, FileText, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTenants } from "@/hooks/useTenants";
import { useRooms } from "@/hooks/useRooms";
import { useBookings } from "@/hooks/useBookings";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const checkInSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  emergencyContact: z.string().optional(),
  roomId: z.string().min(1, "Please select a room"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  rentAmount: z.coerce.number().min(1, "Rent amount is required"),
  securityDeposit: z.coerce.number().optional(),
  notes: z.string().optional(),
});

type CheckInFormValues = z.infer<typeof checkInSchema>;

const CheckIn = () => {
  const { createTenant, isCreating: isCreatingTenant } = useTenants();
  const { rooms } = useRooms();
  const { createBooking, isCreating: isCreatingBooking } = useBookings();
  const navigate = useNavigate();

  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      emergencyContact: "",
      roomId: "",
      checkInDate: new Date().toISOString().split('T')[0],
      rentAmount: 0,
      securityDeposit: 0,
      notes: "",
    },
  });

  const onSubmit = async (values: CheckInFormValues) => {
    try {
      // 1. Create Tenant
      createTenant({
        full_name: values.fullName,
        phone: values.phone,
        email: values.email,
        status: 'active',
        join_date: values.checkInDate,
        room_id: values.roomId
      }, {
        onSuccess: (newTenant: any) => {
          // 2. Create Booking
          createBooking({
            tenant_id: newTenant.id,
            room_id: values.roomId,
            check_in_date: values.checkInDate,
            security_deposit: values.securityDeposit,
            status: 'active'
          }, {
            onSuccess: () => {
              toast.success("Check-in completed successfully!");
              navigate("/inmates");
            }
          });
        }
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to complete check-in");
    }
  };

  const selectedRoomId = form.watch("roomId");
  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  // Update rent amount when room changes
  useState(() => {
    if (selectedRoom) {
      form.setValue("rentAmount", selectedRoom.rent_amount);
    }
  }, [selectedRoomId]);

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Check-in New Inmate</h1>
          <p className="text-slate-500 mt-1">Onboard a new resident and assign them to a room.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <Calendar className="h-4 w-4 text-primary" />
          Today: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Details */}
            <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  Inmate Details
                </CardTitle>
                <CardDescription>Enter personal information of the resident</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} className="rounded-xl h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} className="rounded-xl h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Name and Number" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Room Assignment */}
            <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Home className="h-5 w-5" />
                  </div>
                  Room Assignment
                </CardTitle>
                <CardDescription>Select room and set financial terms</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Rooms</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl h-12">
                            <SelectValue placeholder="Select an available room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {rooms.filter(r => r.status === 'available').map(room => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.room_number} ({room.type}) - ₹{room.rent_amount}
                            </SelectItem>
                          ))}
                          {rooms.filter(r => r.status === 'available').length === 0 && (
                            <SelectItem value="none" disabled>No available rooms</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="rounded-xl h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rent (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="rounded-xl h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="securityDeposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Deposit (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-white border-b border-slate-50 pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
                  <FileText className="h-5 w-5" />
                </div>
                Documents & Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions / Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special requests or observations..." 
                        {...field} 
                        className="rounded-2xl min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4 pb-10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/dashboard")} 
              className="rounded-xl h-12 px-8 border-slate-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreatingTenant || isCreatingBooking} 
              className="rounded-xl h-12 px-10 shadow-lg shadow-primary/20 font-bold"
            >
              {isCreatingTenant || isCreatingBooking ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <UserCheck className="h-5 w-5 mr-2" />
              )}
              Complete Check-in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckIn;