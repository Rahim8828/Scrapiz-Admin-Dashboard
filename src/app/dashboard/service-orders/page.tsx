'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrench, Calendar, MapPin, User, Phone, Mail, Building, FileText, DollarSign, Search, Filter, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { serviceOrders } from "@/lib/data";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColors = {
  'Pending': 'secondary',
  'Confirmed': 'default',
  'In Progress': 'outline',
  'Completed': 'default',
  'Cancelled': 'destructive'
} as const;

const statusIcons = {
  'Pending': Clock,
  'Confirmed': CheckCircle2,
  'In Progress': AlertCircle,
  'Completed': CheckCircle2,
  'Cancelled': XCircle
} as const;

export default function ServiceOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleConfirmOrder = (orderId: string) => {
    alert(`Order ${orderId} confirmed successfully!`);
    // TODO: Implement order confirmation logic
  };

  const handleAssignAgent = (orderId: string) => {
    alert(`Assign agent dialog for order ${orderId}`);
    // TODO: Implement agent assignment dialog
  };

  const handleMarkComplete = (orderId: string) => {
    if (confirm('Mark this order as completed?')) {
      alert(`Order ${orderId} marked as completed!`);
      // TODO: Implement mark complete logic
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      alert(`Order ${orderId} cancelled`);
      // TODO: Implement cancel order logic
    }
  };

  // Get unique services
  const uniqueServices = useMemo(() => {
    return Array.from(new Set(serviceOrders.map(o => o.service)));
  }, []);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return serviceOrders.filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order.service.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesService = serviceFilter === 'all' || order.service === serviceFilter;
      const matchesTab = activeTab === 'all' || order.status === activeTab;
      
      return matchesSearch && matchesStatus && matchesService && matchesTab;
    });
  }, [searchQuery, statusFilter, serviceFilter, activeTab]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      pending: serviceOrders.filter(o => o.status === 'Pending').length,
      confirmed: serviceOrders.filter(o => o.status === 'Confirmed').length,
      inProgress: serviceOrders.filter(o => o.status === 'In Progress').length,
      completed: serviceOrders.filter(o => o.status === 'Completed').length,
      cancelled: serviceOrders.filter(o => o.status === 'Cancelled').length,
      revenue: serviceOrders.reduce((sum, o) => sum + (o.finalPrice || o.estimatedPrice || 0), 0)
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Service Orders</h2>
          <p className="text-muted-foreground mt-1">Manage professional service bookings and appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm px-3 py-1">
            {filteredOrders.length} of {serviceOrders.length} Orders
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('Pending')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('Confirmed')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {stats.confirmed}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready to start</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('In Progress')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {stats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('Completed')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
              {stats.completed}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-background hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              ₹{stats.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All services</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-100">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, order ID, phone, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {uniqueServices.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== 'all' || serviceFilter !== 'all') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setServiceFilter('all');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({serviceOrders.length})</TabsTrigger>
          <TabsTrigger value="Pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="Confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
          <TabsTrigger value="In Progress">Active ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="Completed">Completed ({stats.completed})</TabsTrigger>
          <TabsTrigger value="Cancelled">Cancelled ({stats.cancelled})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Service Orders List */}
      {filteredOrders.length === 0 ? (
        <Card className="border-green-100">
          <CardContent className="py-12 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No service orders found</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== 'all' || serviceFilter !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'Service orders will appear here once customers book services'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map(order => {
            const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
            return (
              <Card key={order.id} className="hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-400 bg-gradient-to-br from-white to-green-50/30 dark:from-background dark:to-green-950/10">
                <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20 dark:to-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-green-900 dark:text-green-100">
                            {order.service}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-0.5">
                            <span className="font-medium">#{order.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {order.date} • {order.time}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={statusColors[order.status as keyof typeof statusColors]}
                      className="flex items-center gap-1 text-sm px-3 py-1.5"
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid md:grid-cols-3 gap-6 mb-5">
                    {/* Customer Info */}
                    <div className="space-y-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                      <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        Customer
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-semibold truncate text-blue-900 dark:text-blue-100">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pl-10">
                          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pl-10">
                          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{order.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900">
                      <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Location
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-purple-600" />
                          <span className="line-clamp-2 leading-relaxed">{order.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <span className="font-semibold text-purple-900 dark:text-purple-100">{order.propertyType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Info */}
                    <div className="space-y-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
                      <h4 className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wide flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        Pricing
                      </h4>
                      <div className="space-y-2">
                        {order.estimatedPrice && (
                          <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-background">
                            <span className="text-xs text-muted-foreground">Estimated</span>
                            <span className="font-bold text-green-700 dark:text-green-400">
                              ₹{order.estimatedPrice.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {order.finalPrice && (
                          <div className="flex items-center justify-between p-2 rounded bg-emerald-100 dark:bg-emerald-900/30">
                            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Final Price</span>
                            <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">
                              ₹{order.finalPrice.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-green-100">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewDetails(order)}
                      className="hover:bg-green-50 hover:text-green-700 hover:border-green-400 transition-all"
                    >
                      <FileText className="h-4 w-4 mr-1.5" />
                      View Details
                    </Button>
                    {order.status === 'Pending' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition-all" onClick={() => handleConfirmOrder(order.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        Confirm Order
                      </Button>
                    )}
                    {order.status === 'Confirmed' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all" onClick={() => handleAssignAgent(order.id)}>
                        <User className="h-4 w-4 mr-1.5" />
                        Assign Agent
                      </Button>
                    )}
                    {order.status === 'In Progress' && (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all" onClick={() => handleMarkComplete(order.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Service Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Wrench className="h-6 w-6 text-green-600" />
                    {selectedOrder.service}
                  </DialogTitle>
                  <DialogDescription className="mt-1">Order #{selectedOrder.id}</DialogDescription>
                </div>
                <Badge 
                  variant={statusColors[selectedOrder.status as keyof typeof statusColors]}
                  className="text-sm px-3 py-1"
                >
                  {selectedOrder.status}
                </Badge>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Customer & Service Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{selectedOrder.customerName}</p>
                        <p className="text-xs text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{selectedOrder.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{selectedOrder.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedOrder.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selectedOrder.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Property Type</span>
                      <Badge variant="outline">{selectedOrder.propertyType}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Address */}
              <Card className="border-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Service Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1">{selectedOrder.address}</p>
                  <p className="text-sm text-muted-foreground">Pincode: {selectedOrder.pincode}</p>
                </CardContent>
              </Card>

              {/* Service-Specific Details */}
              <Card className="border-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Service-Specific Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg space-y-2">
                    {Object.entries(selectedOrder.details).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {selectedOrder.notes && (
                <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Additional Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-900 dark:text-yellow-100">{selectedOrder.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Pricing */}
              {selectedOrder.estimatedPrice && (
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Pricing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Price</span>
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        ₹{selectedOrder.estimatedPrice.toLocaleString()}
                      </span>
                    </div>
                    {selectedOrder.finalPrice && (
                      <>
                        <div className="border-t pt-3 flex items-center justify-between">
                          <span className="text-sm font-medium">Final Price</span>
                          <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                            ₹{selectedOrder.finalPrice.toLocaleString()}
                          </span>
                        </div>
                        {selectedOrder.finalPrice !== selectedOrder.estimatedPrice && (
                          <div className="text-xs text-muted-foreground text-right">
                            {selectedOrder.finalPrice > selectedOrder.estimatedPrice ? '+' : ''}
                            ₹{(selectedOrder.finalPrice - selectedOrder.estimatedPrice).toLocaleString()} from estimate
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                {selectedOrder.status === 'Pending' && (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleConfirmOrder(selectedOrder.id)}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Confirm Order
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleCancelOrder(selectedOrder.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  </>
                )}
                {selectedOrder.status === 'Confirmed' && (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleAssignAgent(selectedOrder.id)}>
                    <User className="h-4 w-4 mr-2" />
                    Assign Agent
                  </Button>
                )}
                {selectedOrder.status === 'In Progress' && (
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleMarkComplete(selectedOrder.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
