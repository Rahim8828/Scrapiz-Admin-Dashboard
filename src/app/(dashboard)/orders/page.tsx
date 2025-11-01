
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
import { Input } from "@/components/ui/input"

import { orders as initialOrders, users, scrapCategories } from "@/lib/data"
import OrdersTableClient from "@/components/dashboard/orders-table-client"
import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import NewOrderDialog from "@/components/dashboard/new-order-dialog";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as OrderStatus | 'all')}>
      <div className="flex items-center gap-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled" className="hidden sm:flex">
            Cancelled
          </TabsTrigger>
        </TabsList>
         <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        <div className="flex items-center gap-2">
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
          <Button size="sm" variant="outline" className="h-9 gap-1">
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
            </Header>
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
            </Header>
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
            </Header>
          <CardContent>
            <OrdersTableClient orders={filteredOrders} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
