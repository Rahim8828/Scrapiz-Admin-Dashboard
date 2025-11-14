'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { users } from "@/lib/data"
import UsersTableClient from "@/components/dashboard/users-table-client"
import { Users, UserCheck, UserX, Shield } from "lucide-react"
import type { UserRole } from "@/lib/types"

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')

  const stats = {
    total: users.length,
    sellers: users.filter(u => u.role === 'seller').length,
    buyers: users.filter(u => u.role === 'buyer').length,
    agents: users.filter(u => u.role === 'agent').length,
    verified: users.filter(u => u.kycStatus === 'verified').length,
    pending: users.filter(u => u.kycStatus === 'pending').length,
  }

  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter(u => u.role === roleFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">Manage all users including sellers, agents, and buyers</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer transition-all hover:shadow-lg border-2"
          style={{ 
            background: roleFilter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
            borderColor: roleFilter === 'all' ? '#667eea' : '#e5e7eb'
          }}
          onClick={() => setRoleFilter('all')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${roleFilter === 'all' ? 'text-white' : ''}`}>
              Total Users
            </CardTitle>
            <Users className={`h-4 w-4 ${roleFilter === 'all' ? 'text-white' : 'text-purple-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${roleFilter === 'all' ? 'text-white' : ''}`}>
              {stats.total}
            </div>
            <p className={`text-xs ${roleFilter === 'all' ? 'text-purple-100' : 'text-muted-foreground'}`}>
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-all hover:shadow-lg border-2"
          style={{ 
            background: roleFilter === 'seller' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'white',
            borderColor: roleFilter === 'seller' ? '#f093fb' : '#e5e7eb'
          }}
          onClick={() => setRoleFilter('seller')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${roleFilter === 'seller' ? 'text-white' : ''}`}>
              Sellers
            </CardTitle>
            <UserCheck className={`h-4 w-4 ${roleFilter === 'seller' ? 'text-white' : 'text-pink-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${roleFilter === 'seller' ? 'text-white' : ''}`}>
              {stats.sellers}
            </div>
            <p className={`text-xs ${roleFilter === 'seller' ? 'text-pink-100' : 'text-muted-foreground'}`}>
              Scrap sellers
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-all hover:shadow-lg border-2"
          style={{ 
            background: roleFilter === 'buyer' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'white',
            borderColor: roleFilter === 'buyer' ? '#4facfe' : '#e5e7eb'
          }}
          onClick={() => setRoleFilter('buyer')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${roleFilter === 'buyer' ? 'text-white' : ''}`}>
              Buyers
            </CardTitle>
            <UserCheck className={`h-4 w-4 ${roleFilter === 'buyer' ? 'text-white' : 'text-cyan-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${roleFilter === 'buyer' ? 'text-white' : ''}`}>
              {stats.buyers}
            </div>
            <p className={`text-xs ${roleFilter === 'buyer' ? 'text-cyan-100' : 'text-muted-foreground'}`}>
              Scrap buyers
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-all hover:shadow-lg border-2"
          style={{ 
            background: roleFilter === 'agent' ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' : 'white',
            borderColor: roleFilter === 'agent' ? '#fa709a' : '#e5e7eb'
          }}
          onClick={() => setRoleFilter('agent')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${roleFilter === 'agent' ? 'text-white' : ''}`}>
              Agents
            </CardTitle>
            <Shield className={`h-4 w-4 ${roleFilter === 'agent' ? 'text-white' : 'text-orange-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${roleFilter === 'agent' ? 'text-white' : ''}`}>
              {stats.agents}
            </div>
            <p className={`text-xs ${roleFilter === 'agent' ? 'text-orange-100' : 'text-muted-foreground'}`}>
              Pickup agents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KYC Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.verified}</div>
            <p className="text-xs text-green-600">KYC completed</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.pending}</div>
            <p className="text-xs text-orange-600">Awaiting KYC</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {roleFilter === 'all' ? 'All Users' : `${roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}s`}
          </CardTitle>
          <CardDescription>
            {roleFilter === 'all' 
              ? `Showing all ${filteredUsers.length} users` 
              : `Showing ${filteredUsers.length} ${roleFilter}s`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTableClient users={filteredUsers} />
        </CardContent>
      </Card>
    </div>
  )
}
