'use client'

import * as React from "react"
import {
    MoreHorizontal,
    MapPin,
    Bot
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Order } from "@/lib/types"
import { users } from "@/lib/data"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { autoAssignAgentToOrder } from "@/ai/flows/auto-assign-agent-to-order"

type OrdersTableClientProps = {
    orders: Order[]
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
    pending: "secondary",
    assigned: "default",
    accepted: "default",
    on_the_way: "default",
    completed: "default",
    cancelled: "destructive",
}

export default function OrdersTableClient({ orders }: OrdersTableClientProps) {
    const { toast } = useToast()

    const handleAutoAssign = async (order: Order) => {
        try {
            toast({
                title: "🤖 Assigning Agent...",
                description: `Finding the best agent for order #${order.id}.`,
            });
            const result = await autoAssignAgentToOrder({ orderId: order.id, pickupAddress: order.pickupAddress });
            toast({
                title: "✅ Agent Assigned",
                description: `Agent ${result.agentId} assigned to order #${order.id}. Reason: ${result.reason}`,
            });
            // Here you would typically update the order state
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "❌ Assignment Failed",
                description: "Could not automatically assign an agent.",
            });
        }
    }


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        Order ID
                    </TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Category
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Pickup Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                     <TableHead className="hidden md:table-cell">
                        Address
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => {
                    const seller = users.find(u => u.id === order.sellerId);
                    const agent = users.find(u => u.id === order.agentId);
                    return (
                        <TableRow key={order.id}>
                            <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                            <TableCell>{seller?.name || 'N/A'}</TableCell>
                            <TableCell>{agent?.name || "Unassigned"}</TableCell>
                            <TableCell className="hidden md:table-cell">{order.scrapCategory}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[order.status] || 'secondary'} className="capitalize">
                                    {order.status.replace(/_/g, ' ')}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {format(new Date(order.pickupTime), "PPp")}
                            </TableCell>
                            <TableCell className="text-right">₹{order.totalAmount?.toFixed(2) ?? 'N/A'}</TableCell>
                             <TableCell className="hidden md:table-cell">
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.pickupAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                                    <MapPin className="w-4 h-4" />
                                    View Map
                                </a>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAutoAssign(order)} disabled={!!order.agentId}>
                                            <Bot className="mr-2 h-4 w-4"/>
                                            Auto-assign Agent
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
