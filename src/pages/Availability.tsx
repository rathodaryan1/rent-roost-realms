import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, Bed, Calendar, Edit } from "lucide-react";

const Availability = () => {
  const rooms = [
    { id: 1, number: "Room 1", type: "Single", capacity: 1, occupied: 1, status: "occupied", rent: 5000 },
    { id: 2, number: "Room 2", type: "Double", capacity: 2, occupied: 2, status: "occupied", rent: 4000 },
    { id: 3, number: "Room 3", type: "Triple", capacity: 3, occupied: 0, status: "available", rent: 3500 },
    { id: 4, number: "Room 4", type: "Single", capacity: 1, occupied: 0, status: "available", rent: 5000 },
    { id: 5, number: "Room 5", type: "Double", capacity: 2, occupied: 1, status: "partial", rent: 4000 },
    { id: 6, number: "Room 6", type: "Triple", capacity: 3, occupied: 0, status: "maintenance", rent: 3500 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'partial': return 'Partially Occupied';
      case 'maintenance': return 'Under Maintenance';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Room Availability</h1>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Rooms
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{rooms.length}</p>
              </div>
              <Home className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {rooms.filter(r => r.status === 'available').length}
                </p>
              </div>
              <Bed className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-red-600">
                  {rooms.filter(r => r.status === 'occupied').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-blue-600">75%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{room.number}</CardTitle>
                <Badge className={getStatusColor(room.status)}>
                  {getStatusText(room.status)}
                </Badge>
              </div>
              <CardDescription>{room.type} Room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{room.capacity} beds</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Occupied:</span>
                <span className="font-medium">{room.occupied} / {room.capacity}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rent:</span>
                <span className="font-medium">₹{room.rent}/month</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                />
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Availability;