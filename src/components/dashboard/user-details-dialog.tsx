'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";
import { format } from "date-fns";
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Wallet, 
  Gift, 
  Home,
  Briefcase,
  Building
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface UserDetailsDialogProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const kycStatusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  verified: "default",
  pending: "secondary",
  rejected: "destructive",
};

const addressIcons = {
  Home: Home,
  Work: Briefcase,
  Other: Building
};

export default function UserDetailsDialog({ user, isOpen, onOpenChange }: UserDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{user.name}</DialogTitle>
              <DialogDescription>
                {user.email} | {user.phone}
              </DialogDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="capitalize">{user.role}</Badge>
                <Badge variant={kycStatusVariant[user.kycStatus]}>{user.kycStatus}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Column */}
          <div className="space-y-4">
            <Card className="border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-900 dark:text-green-100">
                  <UserIcon className="w-4 h-4 text-green-600" />
                  Personal Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {format(new Date(user.createdAt), "PP")}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-900 dark:text-green-100">
                  <Wallet className="w-4 h-4 text-green-600" />
                  Wallet & Referrals
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="font-medium">Wallet Balance:</span>
                  <span className="font-bold text-green-600 text-lg">₹{user.walletBalance.toFixed(2)}</span>
                </div>
                {user.referralCode && (
                  <div className="flex justify-between items-center">
                    <span>Referral Code:</span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-xs">
                      {user.referralCode}
                    </code>
                  </div>
                )}
                {user.totalReferrals !== undefined && (
                  <div className="flex justify-between items-center">
                    <span>Total Referrals:</span>
                    <span className="font-semibold text-green-600">{user.totalReferrals}</span>
                  </div>
                )}
                {user.totalReferrals && user.totalReferrals > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Referral Earnings:</span>
                    <span className="font-semibold text-green-600">₹{user.totalReferrals * 20}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-900 dark:text-green-100">
                  <Gift className="w-4 h-4 text-green-600" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Total Orders:</span>
                  <span className="font-semibold">{user.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Weight:</span>
                  <span className="font-semibold">{user.totalWeight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Zone:</span>
                  <span className="font-semibold">{user.zone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {user.savedAddresses && user.savedAddresses.length > 0 && (
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-green-900 dark:text-green-100">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Saved Addresses ({user.savedAddresses.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.savedAddresses.map(addr => {
                    const Icon = addressIcons[addr.title];
                    return (
                      <div key={addr.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-sm">{addr.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{addr.addressLine}</p>
                        {addr.landmark && (
                          <p className="text-xs text-muted-foreground">Near: {addr.landmark}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{addr.city}, {addr.pincode}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <Phone className="w-3 h-3" />
                          <span>{addr.contactName} - {addr.mobile}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {user.documents && (
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-900 dark:text-green-100">KYC Documents</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {user.documents.aadhaarURL && (
                    <div className="flex justify-between items-center">
                      <span>Aadhaar Card:</span>
                      <a href={user.documents.aadhaarURL} target="_blank" className="text-green-600 hover:underline">
                        View
                      </a>
                    </div>
                  )}
                  {user.documents.panURL && (
                    <div className="flex justify-between items-center">
                      <span>PAN Card:</span>
                      <a href={user.documents.panURL} target="_blank" className="text-green-600 hover:underline">
                        View
                      </a>
                    </div>
                  )}
                  {user.documents.licenseURL && (
                    <div className="flex justify-between items-center">
                      <span>License:</span>
                      <a href={user.documents.licenseURL} target="_blank" className="text-green-600 hover:underline">
                        View
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
