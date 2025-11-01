
'use client';
import {
  File,
  ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

import { orders as initialOrders, users } from "@/lib/data"
import OrdersTableClient from "@/components/dashboard/orders-table-client"
import { useState } from "react";
import type { Order } from "@/lib/types";
import NewOrderDialog from "@/components/dashboard/new-order-dialog";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrderWithId: Order = {
      ...newOrder,
      id: `order-${Math.floor(Math.random() * 1000) + 200}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setOrders(prevOrders => [newOrderWithId, ...prevOrders]);
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled" className="hidden sm:flex">
            Cancelled
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Category</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Agent</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
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
            <OrdersTableClient orders={orders} />
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
            <OrdersTableClient orders={orders.filter(o => o.status === 'pending')} />
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
            <OrdersTableClient orders={orders.filter(o => o.status === 'assigned')} />
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
            <OrdersTableClient orders={orders.filter(o => o.status === 'completed')} />
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
            <OrdersTableClient orders={orders.filter(o => o.status === 'cancelled')} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
