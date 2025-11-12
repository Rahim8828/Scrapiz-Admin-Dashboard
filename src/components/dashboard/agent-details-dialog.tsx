
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { User, AgentStatus } from "@/lib/types"
import { format } from "date-fns"
import Image from "next/image"
import { MapPin, User as UserIcon, Phone, Truck, Calendar, Star, FileText, BarChart2, IndianRupee, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

interface AgentDetailsDialogProps {
  agent: User & { status: AgentStatus; todayOrders: number; }
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const statusVariant: { [key in AgentStatus]: "default" | "secondary" | "destructive" } = {
    'Available': "default",
    'On Duty': "secondary",
    'Offline': "destructive",
}

export default function AgentDetailsDialog({ agent, isOpen, onOpenChange }: AgentDetailsDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
                <DialogDescription>
                    {agent.email} | {agent.phone}
                </DialogDescription>
                 <div className="flex items-center gap-2 mt-1">
                    <Badge variant={statusVariant[agent.status]} className="capitalize">{agent.status}</Badge>
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{agent.rating}/5</span>
                    </div>
                </div>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 max-h-[70vh] overflow-y-auto">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-4">
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <UserIcon className="w-4 h-4"/> Personal Info
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                    <p><strong>Joined:</strong> {format(new Date(agent.createdAt), "PP")}</p>
                    <p className="flex items-start">
                        <strong>Address:</strong>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agent.address)}`} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center gap-1 text-primary hover:underline">
                            <MapPin className="w-4 h-4 shrink-0"/>
                            <span>{agent.address}</span>
                        </a>
                    </p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                       <Truck className="w-4 h-4"/> Vehicle Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p><strong>Vehicle No:</strong> {agent.vehicleNumber || 'N/A'}</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="w-4 h-4"/> Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <a href={agent.documents?.licenseURL} target="_blank" className="flex justify-between items-center text-primary hover:underline"><span>Driving License</span><FileText className="w-4 h-4"/></a>
                    <a href={agent.documents?.aadhaarURL} target="_blank" className="flex justify-between items-center text-primary hover:underline"><span>Aadhaar Card</span><FileText className="w-4 h-4"/></a>
                    <a href={agent.documents?.panURL} target="_blank" className="flex justify-between items-center text-primary hover:underline"><span>PAN Card</span><FileText className="w-4 h-4"/></a>
                </CardContent>
             </Card>
          </div>
          {/* Right Column */}
          <div className="md:col-span-2 space-y-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <BarChart2 className="w-4 h-4"/> Performance Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold">{agent.todayOrders}</p>
                            <p className="text-sm text-muted-foreground">Today's Orders</p>
                        </div>
                         <div>
                            <p className="text-2xl font-bold">{agent.totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <IndianRupee className="w-4 h-4"/> Earnings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <p className="text-lg font-bold">₹{(agent.walletBalance * 0.2).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">₹{(agent.walletBalance * 0.6).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">This Week</p>
                        </div>
                         <div>
                            <p className="text-lg font-bold">₹{agent.walletBalance.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">This Month</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4"/> Live Location
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Map integration coming soon.</p>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
