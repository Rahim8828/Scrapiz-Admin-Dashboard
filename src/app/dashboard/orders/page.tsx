
'use client';
import {
  File,
  ListFilter,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { orders as initialOrders, users, scrapCategories } from "@/lib/data"
import OrdersTableClient from "@/components/dashboard/orders-table-client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Order, OrderStatus } from "@/lib/types";
import NewOrderDialog from "@/components/dashboard/new-order-dialog";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || "");
  const [filters, setFilters] = useState({
    category: [] as string[],
    agent: [] as string[],
  });

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrderWithId: Order = {
      ...newOrder,
      id: `order-${Math.floor(Math.random() * 1000) + 200}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    const updatedOrders = [newOrderWithId, ...orders];
    setOrders(updatedOrders);
  };
  
  const handleFilterChange = (type: 'category' | 'agent', value: string) => {
    setFilters(prev => {
        const currentValues = prev[type] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        return { ...prev, [type]: newValues };
    });
  };

  useEffect(() => {
    let newFilteredOrders = orders;

    // Filter by Tab
    if (activeTab !== 'all') {
      newFilteredOrders = newFilteredOrders.filter(o => o.status === activeTab);
    }
    
    // Filter by Search Term
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        newFilteredOrders = newFilteredOrders.filter(order =>
            order.id.toLowerCase().includes(lowercasedTerm) ||
            (users.find(u => u.id === order.sellerId)?.name.toLowerCase().includes(lowercasedTerm)) ||
            (users.find(u => u.id === order.agentId)?.name.toLowerCase().includes(lowercasedTerm))
        );
    }

    // Filter by Category
    if (filters.category.length > 0) {
        newFilteredOrders = newFilteredOrders.filter(order => filters.category.includes(order.scrapCategory));
    }

    // Filter by Agent
    if (filters.agent.length > 0) {
        newFilteredOrders = newFilteredOrders.filter(order => order.agentId && filters.agent.includes(order.agentId));
    }


    setFilteredOrders(newFilteredOrders);
  }, [activeTab, orders, searchTerm, filters]);


  const agents = users.filter(u => u.role === 'agent');

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    assigned: orders.filter(o => o.status === 'assigned').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    weight: orders.reduce((sum, o) => sum + (o.finalWeight || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Scrap Orders</h2>
          <p className="text-muted-foreground mt-1">Manage all scrap pickup orders and assignments</p>
        </div>
        <NewOrderDialog 
          sellers={users.filter(u => u.role === 'seller')} 
          onOrderCreate={handleAddOrder}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('all')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('pending')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs assignment</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('assigned')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.assigned}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-background hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('completed')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus | 'all')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">All</TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 sm:flex-none">Pending</TabsTrigger>
          <TabsTrigger value="assigned" className="flex-1 sm:flex-none">Assigned</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 sm:flex-none">Completed</TabsTrigger>
          <TabsTrigger value="cancelled" className="hidden sm:flex">
            Cancelled
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2 sm:ml-auto">
         <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-secondary pl-8 sm:w-[200px] lg:w-[320px]"
            />
          </div>
        <div className="flex items-center gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-normal">Category</DropdownMenuLabel>
               {scrapCategories.map(cat => (
                 <DropdownMenuCheckboxItem
                    key={cat.id}
                    checked={filters.category.includes(cat.name)}
                    onCheckedChange={() => handleFilterChange('category', cat.name)}
                 >
                    {cat.name}
                 </DropdownMenuCheckboxItem>
               ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-normal">Agent</DropdownMenuLabel>
               {agents.map(agent => (
                 <DropdownMenuCheckboxItem
                    key={agent.id}
                    checked={filters.agent.includes(agent.id)}
                    onCheckedChange={() => handleFilterChange('agent', agent.id)}
                 >
                    {agent.name}
                 </DropdownMenuCheckboxItem>
               ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-9 gap-1 hidden sm:flex">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
           <NewOrderDialog 
            sellers={users.filter(u => u.role === 'seller')} 
            onOrderCreate={handleAddOrder}
          />
        </div>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>
                    Manage all scrap pickup orders.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pending">
        <Card>
            <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>
                    Orders awaiting agent assignment.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="assigned">
        <Card>
            <CardHeader>
                <CardTitle>Assigned Orders</CardTitle>
                <CardDescription>
                    Orders that have been assigned to an agent.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="completed">
        <Card>
            <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>
                    Successfully completed orders.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="cancelled">
        <Card>
            <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
                <CardDescription>
                    Cancelled orders.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
