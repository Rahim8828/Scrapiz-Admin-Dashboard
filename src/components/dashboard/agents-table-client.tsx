
'use client'

import * as React from "react"
import { MoreHorizontal, Star } from "lucide-react"
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
import type { User, AgentStatus } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AgentDetailsDialog from "./agent-details-dialog"

type AgentsTableClientProps = {
    agents: User[]
}

const agentStatuses: AgentStatus[] = ['Available', 'On Duty', 'Offline'];

const statusVariant: { [key in AgentStatus]: "default" | "secondary" | "destructive" } = {
    'Available': "default",
    'On Duty': "secondary",
    'Offline': "destructive",
}

export default function AgentsTableClient({ agents: initialAgents }: AgentsTableClientProps) {
    const [agents, setAgents] = React.useState(() => 
        initialAgents.map(agent => ({
            ...agent,
            status: agentStatuses[Math.floor(Math.random() * agentStatuses.length)],
            todayOrders: Math.floor(Math.random() * 10),
        }))
    );
    const [selectedAgent, setSelectedAgent] = React.useState<User & { status: AgentStatus; todayOrders: number; } | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    const handleViewDetails = (agent: User & { status: AgentStatus; todayOrders: number; }) => {
        setSelectedAgent(agent);
        setIsDetailsOpen(true);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead className="hidden md:table-cell">Today's Orders</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agents.map((agent) => (
                        <TableRow key={agent.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={agent.avatarUrl} alt="Avatar" />
                                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>{agent.name}</p>
                                        <p className="text-xs text-muted-foreground">{agent.phone}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[agent.status]} className="capitalize">{agent.status}</Badge>
                            </TableCell>
                            <TableCell>{agent.vehicleNumber || 'N/A'}</TableCell>
                            <TableCell className="hidden md:table-cell text-center">{agent.todayOrders}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span>{agent.rating?.toFixed(1)}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleViewDetails(agent)}>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Track Location</DropdownMenuItem>
                                        <DropdownMenuItem>Manage Documents</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedAgent && (
                <AgentDetailsDialog
                    agent={selectedAgent}
                    isOpen={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                />
            )}
        </>
    )
}
