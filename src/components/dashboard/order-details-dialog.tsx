'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Order, User } from "@/lib/types"
import { users } from "@/lib/data"
import { format } from "date-fns"
import Image from "next/image"
import { MapPin, User as UserIcon, Phone, Truck, Calendar, Hash, Box, Weight, DollarSign, StickyNote, Image as ImageIcon } from "lucide-react"

interface OrderDetailsDialogProps {
  order: Order
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const statusHistory = {
    pending: ['Order Placed'],
    assigned: ['Order Placed', 'Agent Assigned'],
    on_the_way: ['Order Placed', 'Agent Assigned', 'Agent On The Way'],
    completed: ['Order Placed', 'Agent Assigned', 'Agent On The Way', 'Order Completed'],
    cancelled: ['Order Placed', 'Order Cancelled']
}

export default function OrderDetailsDialog({ order, isOpen, onOpenChange }: OrderDetailsDialogProps) {
  const seller = users.find(u => u.id === order.sellerId) as User
  const agent = users.find(u => u.id === order.agentId)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details: #{order.id}</DialogTitle>
          <DialogDescription>
            Detailed view of the scrap pickup order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center"><UserIcon className="w-5 h-5 mr-2" />Customer Information</h3>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {seller.name}</p>
                <p><strong>Email:</strong> {seller.email}</p>
                <p><strong>Phone:</strong> {seller.phone}</p>
                <p className="flex items-start">
                    <strong>Address:</strong>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.pickupAddress)}`} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center gap-1 text-primary hover:underline">
                        <MapPin className="w-4 h-4 shrink-0"/>
                        <span>{order.pickupAddress}</span>
                    </a>
                </p>
              </div>
            </div>
            
            {/* Agent Info */}
            {agent && (
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center"><Truck className="w-5 h-5 mr-2" />Assigned Agent</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {agent.name}</p>
                  <p><strong>Phone:</strong> {agent.phone}</p>
                  <p><strong>Rating:</strong> {agent.rating} / 5</p>
                </div>
              </div>
            )}

            {/* Order Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center"><Box className="w-5 h-5 mr-2" />Order Information</h3>
              <div className="text-sm space-y-1">
                <p><strong>Category:</strong> {order.scrapCategory}</p>
                <p><strong>Est. Weight:</strong> {order.estimatedWeight} kg</p>
                <p className="flex items-center"><strong>Pickup Time:</strong><Calendar className="w-4 h-4 mx-1" />{format(new Date(order.pickupTime), "PPp")}</p>
              </div>
            </div>
            
            {/* Pricing Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center"><DollarSign className="w-5 h-5 mr-2" />Pricing Details</h3>
              <div className="text-sm space-y-1">
                <p><strong>Rate:</strong> ₹{order.pricePerKg.toFixed(2)} / kg</p>
                {order.finalWeight && <p><strong>Final Weight:</strong> {order.finalWeight.toFixed(2)} kg</p>}
                {order.totalAmount && <p className="font-bold"><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>}
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Status Timeline */}
            <div>
                <h3 className="font-semibold text-lg mb-2">Status Timeline</h3>
                <div className="relative pl-4">
                    <div className="absolute left-[0.45rem] top-2 bottom-2 w-0.5 bg-border"></div>
                    {(statusHistory[order.status] || []).map((status, index) => (
                        <div key={index} className="flex items-start gap-4 mb-2 relative">
                            <div className="h-4 w-4 bg-primary rounded-full z-10"></div>
                            <p className="font-medium text-sm">{status}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes */}
            {order.notes && (
                <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center"><StickyNote className="w-5 h-5 mr-2" />Customer Notes</h3>
                    <p className="text-sm bg-muted p-3 rounded-md">{order.notes}</p>
                </div>
            )}
            
            {/* Proof Photo */}
            {order.proofPhotoUrl && (
                <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center"><ImageIcon className="w-5 h-5 mr-2" />Proof of Pickup</h3>
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image src={order.proofPhotoUrl} alt="Proof of pickup" layout="fill" objectFit="cover" data-ai-hint="scrap metal" />
                    </div>
                </div>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
