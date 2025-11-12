'use client'

import * as React from "react"
import {
    MoreHorizontal,
    MapPin,
    Bot,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    Phone,
    Download,
    RefreshCw
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
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
import OrderDetailsDialog from "./order-details-dialog"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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

const ITEMS_PER_PAGE = 10;

export default function OrdersTableClient({ orders: initialOrders }: OrdersTableClientProps) {
    const [orders, setOrders] = React.useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const { toast } = useToast()

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    const handleAutoAssign = async (order: Order) => {
        try {
            toast({
                title: "🤖 Assigning Agent...",
                description: `Finding the best agent for order #${order.id}.`,
            });
            const result = await autoAssignAgentToOrder({ orderId: order.id, pickupAddress: order.pickupAddress });
            
            // Update order state locally
            setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? {...o, agentId: result.agentId, status: 'assigned'} : o));

            toast({
                title: "✅ Agent Assigned",
                description: `Agent ${result.agentId} assigned to order #${order.id}. Reason: ${result.reason}`,
            });
            
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "❌ Assignment Failed",
                description: "Could not automatically assign an agent.",
            });
        }
    }

    const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
        toast({
            title: "✅ Status Updated",
            description: `Order #${orderId} has been updated to "${newStatus.replace(/_/g, ' ')}".`,
        });
    }

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    }

    return (
        <>
        <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        Order ID
                    </TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Agent</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Category
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                        Pickup Date
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-right">Amount</TableHead>
                     <TableHead className="hidden xl:table-cell">
                        Address
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedOrders.map((order) => {
                    const seller = users.find(u => u.id === order.sellerId);
                    const agent = users.find(u => u.id === order.agentId);
                    return (
                        <TableRow key={order.id}>
                            <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{seller?.name || 'N/A'}</div>
                                <div className="text-xs text-muted-foreground sm:hidden">
                                    {order.scrapCategory} • ₹{order.totalAmount?.toFixed(2) ?? 'N/A'}
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{agent?.name || "Unassigned"}</TableCell>
                            <TableCell className="hidden md:table-cell">{order.scrapCategory}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[order.status] || 'secondary'} className="capitalize text-xs">
                                    {order.status.replace(/_/g, ' ')}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                {format(new Date(order.pickupTime), "PPp")}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right">₹{order.totalAmount?.toFixed(2) ?? 'N/A'}</TableCell>
                             <TableCell className="hidden xl:table-cell">
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
                                        <DropdownMenuItem onClick={() => handleViewDetails(order)}>View Details</DropdownMenuItem>
                                        <DropdownMenuItem disabled={!seller}>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Contact Customer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAutoAssign(order)} disabled={!!order.agentId}>
                                            <Bot className="mr-2 h-4 w-4"/>
                                            Auto-assign Agent
                                        </DropdownMenuItem>
                                         <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Change Status
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem 
                                                    onClick={() => handleUpdateStatus(order.id, 'pending')}
                                                    disabled={order.status === 'pending'}
                                                >
                                                    <Clock className="mr-2 h-4 w-4 text-yellow-500"/> Pending
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => handleUpdateStatus(order.id, 'assigned')}
                                                    disabled={order.status === 'assigned'}
                                                >
                                                    <Bot className="mr-2 h-4 w-4 text-blue-500"/> Assigned
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => handleUpdateStatus(order.id, 'on_the_way')}
                                                    disabled={order.status === 'on_the_way'}
                                                >
                                                    <Truck className="mr-2 h-4 w-4 text-purple-500"/> On the Way
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => handleUpdateStatus(order.id, 'completed')}
                                                    disabled={order.status === 'completed'}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500"/> Completed
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="text-destructive" 
                                                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                                    disabled={order.status === 'cancelled'}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4"/> Cancelled
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator />
                                         <DropdownMenuItem disabled={!order.totalAmount}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Invoice
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        </div>
        {totalPages > 1 && (
            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(p => Math.max(1, p - 1));
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                                page = i + 1;
                            } else if (currentPage <= 3) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                            } else {
                                page = currentPage - 2 + i;
                            }
                            return (
                                <PaginationItem key={page} className="hidden sm:inline-flex">
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(page);
                                        }}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        <PaginationItem>
                            <PaginationNext 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(p => Math.min(totalPages, p + 1));
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )}
        {selectedOrder && (
             <OrderDetailsDialog 
                order={selectedOrder}
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
             />
        )}
        </>
    )
}
