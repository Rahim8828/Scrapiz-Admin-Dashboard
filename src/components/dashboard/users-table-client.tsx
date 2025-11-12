'use client'

import * as React from "react"
import { MoreHorizontal } from "lucide-react"
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
import type { User } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import UserDetailsDialog from "./user-details-dialog"

type UsersTableClientProps = {
    users: User[]
}

const kycStatusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
    verified: "default",
    pending: "secondary",
    rejected: "destructive",
}

const ITEMS_PER_PAGE = 10;

export default function UsersTableClient({ users }: UsersTableClientProps) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setIsDetailsOpen(true);
    };

    return (
        <>
        <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Avatar</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                        KYC Status
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                        Joined Date
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-right">Wallet Balance</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="hidden sm:table-cell">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.avatarUrl} alt="Avatar" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                            {user.name}
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                            <div className="flex gap-2 mt-1 sm:hidden">
                                <Badge variant="outline" className="capitalize text-xs">{user.role}</Badge>
                                <span className="text-xs">₹{user.walletBalance.toFixed(2)}</span>
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className="capitalize">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                             <Badge variant={kycStatusVariant[user.kycStatus]} className="capitalize">
                                {user.kycStatus}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-right">₹{user.walletBalance.toFixed(2)}</TableCell>
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
                                    <DropdownMenuItem onClick={() => handleViewDetails(user)}>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Verify KYC</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
        {selectedUser && (
            <UserDetailsDialog 
                user={selectedUser}
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
            />
        )}
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
        </>
    )
}
