import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, User, Calendar, CreditCard, AlertCircle } from "lucide-react";

const PaymentApprovals = () => {
  const pendingApprovals = [
    {
      id: 1,
      inmateId: 1,
      inmateName: "John Doe",
      room: "Room 12",
      amount: 5000,
      type: "rent",
      requestDate: "2024-01-15",
      method: "UPI",
      reason: "Monthly rent payment",
      priority: "high"
    },
    {
      id: 2,
      inmateId: 2,
      inmateName: "Sarah Wilson",
      room: "Room 8",
      amount: 1500,
      type: "maintenance",
      requestDate: "2024-01-14",
      method: "Cash",
      reason: "AC repair charges",
      priority: "medium"
    },
    {
      id: 3,
      inmateId: 3,
      inmateName: "Mike Johnson",
      room: "Room 15",
      amount: 10000,
      type: "deposit",
      requestDate: "2024-01-13",
      method: "Bank Transfer",
      reason: "Security deposit refund",
      priority: "low"
    },
    {
      id: 4,
      inmateId: 4,
      inmateName: "Emma Davis",
      room: "Room 3",
      amount: 2000,
      type: "advance",
      requestDate: "2024-01-12",
      method: "UPI",
      reason: "Advance rent payment",
      priority: "medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rent': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-purple-100 text-purple-800';
      case 'deposit': return 'bg-green-100 text-green-800';
      case 'advance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id: number) => {
    console.log(`Approving payment ${id}`);
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting payment ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Approvals</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          {pendingApprovals.length} pending approvals
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold">{pendingApprovals.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {pendingApprovals.filter(p => p.priority === 'high').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{pendingApprovals.reduce((sum, p) => sum + p.amount, 0)}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Oldest Request</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.ceil((new Date().getTime() - new Date(Math.min(...pendingApprovals.map(p => new Date(p.requestDate).getTime()))).getTime()) / (1000 * 60 * 60 * 24))}d
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {pendingApprovals.map((approval) => (
          <Card key={approval.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{approval.inmateName}</CardTitle>
                    <CardDescription>{approval.room}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(approval.priority)}>
                    {approval.priority} priority
                  </Badge>
                  <Badge className={getTypeColor(approval.type)}>
                    {approval.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-bold text-lg">₹{approval.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payment Method:</span>
                    <span className="font-medium">{approval.method}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Request Date:</span>
                    <span className="font-medium">{new Date(approval.requestDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Reason:</span>
                    <p className="text-sm mt-1">{approval.reason}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Days Pending:</span>
                    <span className="text-sm font-medium ml-2">
                      {Math.ceil((new Date().getTime() - new Date(approval.requestDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={() => handleApprove(approval.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button 
                  onClick={() => handleReject(approval.id)}
                  variant="outline" 
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="px-6">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingApprovals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-medium mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">
              No pending payment approvals at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentApprovals;