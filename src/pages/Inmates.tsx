import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Home, 
  Calendar, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Filter,
  Download,
  Mail,
  Loader2,
  X
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTenants } from "@/hooks/useTenants";
import { useRooms } from "@/hooks/useRooms";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const tenantSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  room_id: z.string().min(1, "Please select a room"),
  join_date: z.string().min(1, "Join date is required"),
  status: z.enum(["active", "notice", "inactive"]),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

const Inmates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { tenants, isLoading, createTenant, deleteTenant, isCreating } = useTenants();
  const { rooms } = useRooms();

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      room_id: "",
      join_date: new Date().toISOString().split('T')[0],
      status: "active",
    },
  });

  const onSubmit = (values: TenantFormValues) => {
    createTenant(values, {
      onSuccess: () => {
        setIsDialogOpen(false);
        form.reset();
      },
    });
  };

  const filteredTenants = tenants.filter((tenant: any) =>
    tenant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tenant Management</h1>
          <p className="text-slate-500 mt-1">Manage and track all your PG residents with real-time data.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4 mr-2" /> Add New Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
                <DialogDescription>
                  Enter the details of the new resident to add them to your PG.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} className="rounded-xl" />
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
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="room_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assign Room</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select a room" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              {rooms.filter((r: any) => r.status === 'available').map((room: any) => (
                                <SelectItem key={room.id} value={room.id}>
                                  {room.room_number} (₹{room.rent_amount})
                                </SelectItem>
                              ))}
                              {rooms.filter((r: any) => r.status === 'available').length === 0 && (
                                <SelectItem value="none" disabled>No available rooms</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="join_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Join Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreating} className="rounded-xl">
                      {isCreating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Tenant
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-none shadow-sm rounded-2xl">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by name, phone, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-primary"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </CardContent>
      </Card>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2rem] animate-pulse">
                <div className="h-64 bg-slate-100 rounded-[2rem]"></div>
              </Card>
            ))
          ) : filteredTenants.length > 0 ? (
            filteredTenants.map((tenant: any, i: number) => (
              <motion.div
                key={tenant.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group bg-white border-b-4 border-b-transparent hover:border-b-primary">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-xl text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {tenant.full_name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900">{tenant.full_name}</CardTitle>
                          <Badge className={`mt-1 font-bold ${
                            tenant.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            'bg-yellow-50 text-yellow-600 border-yellow-100'
                          }`} variant="outline">
                            {tenant.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                            <Edit className="h-4 w-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="rounded-lg gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                            onClick={() => {
                              if(confirm("Are you sure you want to delete this tenant?")) {
                                deleteTenant(tenant.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete Tenant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Room</p>
                        <p className="font-bold text-slate-900 flex items-center gap-2">
                          <Home className="h-3 w-3 text-primary" /> {tenant.room_id || "Unassigned"}
                        </p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone</p>
                        <p className="font-bold text-slate-900">{tenant.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <Mail className="h-4 w-4 text-slate-400" />
                        {tenant.email || "No email provided"}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        Joined: {new Date(tenant.join_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold h-11">
                        View Details
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-11 w-11">
                        <Phone className="h-4 w-4 text-emerald-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="space-y-4">
                <div className="h-20 w-20 bg-slate-100 rounded-3xl mx-auto flex items-center justify-center">
                  <User className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No tenants found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Try adding a new tenant or adjusting your search.
                </p>
                <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl font-bold">
                  Add Your First Tenant
                </Button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Inmates;