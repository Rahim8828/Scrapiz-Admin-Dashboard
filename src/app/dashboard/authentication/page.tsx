'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  FileText, 
  Search, 
  UserPlus, 
  Key,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  Lock,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demonstration
const adminUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@scrapiz.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-11-13 10:30 AM",
    avatar: "https://i.pravatar.cc/150?u=admin@scrapiz.com"
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@scrapiz.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-11-13 09:15 AM",
    avatar: "https://i.pravatar.cc/150?u=manager@scrapiz.com"
  },
  {
    id: 3,
    name: "Support User",
    email: "support@scrapiz.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2024-11-12 05:45 PM",
    avatar: "https://i.pravatar.cc/150?u=support@scrapiz.com"
  },
];

const auditLogs = [
  {
    id: 1,
    user: "Admin User",
    action: "User Created",
    resource: "User: manager@scrapiz.com",
    timestamp: "2024-11-13 10:30 AM",
    status: "Success",
    ip: "192.168.1.1"
  },
  {
    id: 2,
    user: "Manager User",
    action: "Order Updated",
    resource: "Order #ORD-001",
    timestamp: "2024-11-13 09:15 AM",
    status: "Success",
    ip: "192.168.1.2"
  },
  {
    id: 3,
    user: "Admin User",
    action: "Settings Changed",
    resource: "System Settings",
    timestamp: "2024-11-13 08:00 AM",
    status: "Success",
    ip: "192.168.1.1"
  },
  {
    id: 4,
    user: "Support User",
    action: "Login Failed",
    resource: "Authentication",
    timestamp: "2024-11-12 11:30 PM",
    status: "Failed",
    ip: "192.168.1.3"
  },
  {
    id: 5,
    user: "Manager User",
    action: "User Deleted",
    resource: "User: test@scrapiz.com",
    timestamp: "2024-11-12 03:20 PM",
    status: "Success",
    ip: "192.168.1.2"
  },
];

const permissions = [
  { module: "Dashboard", view: true, create: false, edit: false, delete: false },
  { module: "Orders", view: true, create: true, edit: true, delete: false },
  { module: "Users", view: true, create: true, edit: true, delete: true },
  { module: "Agents", view: true, create: true, edit: true, delete: false },
  { module: "Payments", view: true, create: false, edit: false, delete: false },
  { module: "Reports", view: true, create: true, edit: false, delete: false },
  { module: "Settings", view: true, create: false, edit: true, delete: false },
];

export default function AuthenticationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Button handlers
  const handleAddUser = () => {
    alert('Add Admin User dialog would open here');
    // TODO: Implement add user dialog
  };

  const handleViewUser = (userId: number) => {
    alert(`View details for user ID: ${userId}`);
    // TODO: Implement view user details
  };

  const handleEditUser = (userId: number) => {
    alert(`Edit user ID: ${userId}`);
    // TODO: Implement edit user dialog
  };

  const handleToggleLock = (userId: number, currentStatus: string) => {
    const action = currentStatus === 'Active' ? 'lock' : 'unlock';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      alert(`User ${action}ed successfully`);
      // TODO: Implement lock/unlock functionality
    }
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      alert(`User ${userName} deleted successfully`);
      // TODO: Implement delete functionality
    }
  };

  const handleSavePermissions = () => {
    alert('Permissions saved successfully!');
    // TODO: Implement save permissions
  };

  const handleResetPermissions = () => {
    if (confirm('Are you sure you want to reset permissions to default?')) {
      alert('Permissions reset to default');
      // TODO: Implement reset permissions
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Authentication & Access</h2>
          <p className="text-muted-foreground mt-1">Manage users, roles, permissions, and audit logs</p>
        </div>
        <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Admin Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{adminUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {adminUsers.filter(u => u.status === 'Active').length} active
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">3</div>
            <p className="text-xs text-muted-foreground mt-1">Super Admin, Manager, Support</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Audit Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{auditLogs.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Failed Logins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {auditLogs.filter(l => l.status === 'Failed').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Admin Users
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileText className="h-4 w-4 mr-2" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Key className="h-4 w-4 mr-2" />
            Permissions
          </TabsTrigger>
        </TabsList>

        {/* Admin Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-green-100">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Admin Users Management
                  </CardTitle>
                  <CardDescription>Manage admin users and their access levels</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status === 'Active' ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {user.lastLogin}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewUser(user.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditUser(user.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleToggleLock(user.id, user.status)}>
                              {user.status === 'Active' ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <Unlock className="h-4 w-4" />
                              )}
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteUser(user.id, user.name)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Audit Logs
              </CardTitle>
              <CardDescription>Track all system activities and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.resource}</TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.ip}</TableCell>
                        <TableCell>
                          <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                            {log.status === 'Success' ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-600" />
                Role Permissions
              </CardTitle>
              <CardDescription>Configure access permissions for different roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium">Select Role:</span>
                  <Select defaultValue="manager">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead className="text-center">View</TableHead>
                        <TableHead className="text-center">Create</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((perm, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{perm.module}</TableCell>
                          <TableCell className="text-center">
                            {perm.view ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.create ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.edit ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.delete ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={handleResetPermissions}>Reset</Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleSavePermissions}>Save Permissions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
