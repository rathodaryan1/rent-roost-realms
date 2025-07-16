import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Phone, MapPin, Calendar, Edit, Trash2 } from "lucide-react";

const Inmates = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inmates = [
    {
      id: 1,
      name: "John Doe",
      mobile: "+91 9876543210",
      room: "Room 12",
      joinDate: "2024-01-15",
      rent: 5000,
      status: "active",
      dueAmount: 0,
      profilePic: null
    },
    {
      id: 2,
      name: "Sarah Wilson",
      mobile: "+91 9876543211",
      room: "Room 8",
      joinDate: "2024-02-01",
      rent: 4500,
      status: "active",
      dueAmount: 1500,
      profilePic: null
    },
    {
      id: 3,
      name: "Mike Johnson",
      mobile: "+91 9876543212",
      room: "Room 15",
      joinDate: "2024-01-10",
      rent: 5500,
      status: "notice",
      dueAmount: 0,
      profilePic: null
    },
    {
      id: 4,
      name: "Emma Davis",
      mobile: "+91 9876543213",
      room: "Room 3",
      joinDate: "2024-03-01",
      rent: 4000,
      status: "active",
      dueAmount: 0,
      profilePic: null
    }
  ];

  const filteredInmates = inmates.filter(inmate =>
    inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inmate.mobile.includes(searchTerm) ||
    inmate.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'notice': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'notice': return 'Notice Period';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inmates</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Inmate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Inmates</p>
                <p className="text-2xl font-bold">{inmates.length}</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {inmates.filter(i => i.status === 'active').length}
                </p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Dues</p>
                <p className="text-2xl font-bold text-red-600">
                  ₹{inmates.reduce((sum, i) => sum + i.dueAmount, 0)}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{inmates.reduce((sum, i) => sum + i.rent, 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Inmates</CardTitle>
          <CardDescription>Find inmates by name, mobile number, or room</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, mobile, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInmates.length > 0 ? (
          filteredInmates.map((inmate) => (
            <Card key={inmate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{inmate.name}</CardTitle>
                      <CardDescription>ID: #{inmate.id.toString().padStart(4, '0')}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(inmate.status)}>
                    {getStatusText(inmate.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {inmate.mobile}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {inmate.room}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined: {new Date(inmate.joinDate).toLocaleDateString()}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rent: ₹{inmate.rent}/month</span>
                  {inmate.dueAmount > 0 && (
                    <span className="text-sm font-medium text-red-600">
                      Due: ₹{inmate.dueAmount}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No inmates found!</h3>
              <p className="text-sm">Try adjusting your search terms or add a new inmate.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inmates;