import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, MapPin, Plus, Loader2, Edit, Trash2, Home } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService, Property } from "@/services/propertyService";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const propertySchema = z.object({
  name: z.string().min(2, "Property name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const Properties = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: propertyService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      setIsDialogOpen(false);
      form.reset();
      toast.success("Property added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add property");
    }
  });

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = (values: PropertyFormValues) => {
    createMutation.mutate(values);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-premium">My Properties</h1>
          <p className="text-slate-500 mt-1">Manage multiple PG accommodations from one dashboard.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white font-bold h-12 px-6">
              <Plus className="h-5 w-5 mr-2" /> Add New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">New Property</DialogTitle>
              <DialogDescription>
                Register a new PG building or accommodation.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Royal Residency" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123, MG Road" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Bangalore" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} className="rounded-xl h-12 px-8 font-bold">
                    {createMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                    Register Property
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-[2.5rem]" />
            ))
          ) : properties.length > 0 ? (
            properties.map((property: Property, i: number) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group bg-white border-b-8 border-transparent hover:border-primary">
                  <CardHeader className="pb-4 relative">
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
                        <Edit className="h-4 w-4 text-slate-600" />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <Building className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">{property.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 font-medium text-slate-500 mt-1">
                      <MapPin className="h-4 w-4 text-primary/60" /> {property.city}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8 pt-4">
                    <p className="text-sm text-slate-400 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {property.address}
                    </p>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 shadow-lg shadow-slate-200">
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-2xl border-slate-200 h-12 font-bold hover:bg-slate-50">
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="h-24 w-24 bg-slate-100 rounded-[2.5rem] mx-auto flex items-center justify-center mb-6">
                <Building className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No properties found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">
                You haven't added any properties yet. Register your first PG to start managing rooms and tenants.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-8 rounded-2xl px-10 h-14 font-bold shadow-xl shadow-primary/20">
                Register Your First Property
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Properties;
