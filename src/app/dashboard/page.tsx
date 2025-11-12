import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Users,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Weight,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Wrench,
  Gift,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { orders, users, serviceOrders, referrals } from "@/lib/data"
import OrdersChart from "@/components/dashboard/orders-chart"
import ScrapVolumeChart from "@/components/dashboard/scrap-volume-chart"
import RevenueChart from "@/components/dashboard/revenue-chart"
import CategoryPerformanceChart from "@/components/dashboard/category-performance-chart"
import AgentPerformanceChart from "@/components/dashboard/agent-performance-chart"
import ServiceStatsChart from "@/components/dashboard/service-stats-chart"

export default function Dashboard() {
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0)
    const serviceRevenue = serviceOrders.reduce((acc, order) => acc + (order.finalPrice || order.estimatedPrice || 0), 0)
    const completedOrders = orders.filter(o => o.status === 'completed').length
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'assigned').length
    const totalWeight = orders.reduce((acc, order) => acc + (order.finalWeight || 0), 0)
    const activeAgents = users.filter(u => u.role === 'agent').length
    const totalOrders = orders.length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const totalReferrals = referrals.length
    const activeReferrals = referrals.filter(r => r.status === 'Completed').length

  return (
    <div className="flex w-full flex-col gap-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-green-900 dark:text-green-100">Dashboard Overview</h2>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your scrap collection business.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="hover:bg-green-50 hover:text-green-700 hover:border-green-300">
              <Link href="/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
              <Link href="/dashboard/orders">
                <Package className="mr-2 h-4 w-4" />
                New Order
              </Link>
            </Button>
          </div>
        </div>
        {/* KPI Cards - Enhanced */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Total Revenue
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">₹{(totalRevenue + serviceRevenue).toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600 font-medium">+20.1%</span> from last month
              </p>
              <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                Scrap: ₹{totalRevenue.toLocaleString()} • Services: ₹{serviceRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Orders
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalOrders + serviceOrders.length}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <CheckCircle className="h-3 w-3 text-blue-600" />
                <span className="text-blue-600 font-medium">{completedOrders}</span> completed
              </p>
              <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                Scrap: {totalOrders} • Services: {serviceOrders.length}
              </div>
            </CardContent>
          </Card>
          
           <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Pending Orders</CardTitle>
              <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <AlertCircle className="h-3 w-3 text-orange-600" />
                <span className="text-orange-600 font-medium">Needs attention</span>
              </p>
              <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                Avg response time: 2.5 hours
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-purple-200 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Total Weight
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Weight className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{totalWeight.toFixed(0)} kg</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span className="text-purple-600 font-medium">+2.5%</span> from last month
              </p>
              <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                Avg per order: {(totalWeight / totalOrders).toFixed(1)} kg
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Stats Row - Enhanced */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-100 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active Agents</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Truck className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{activeAgents}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently on duty</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Avg Order Value</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">₹{avgOrderValue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Per order average</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Customers</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{users.filter(u => u.role === 'seller').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered sellers</p>
            </CardContent>
          </Card>

          <Card className="border-pink-100 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-900 dark:text-pink-100">Referrals</CardTitle>
              <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                <Gift className="h-4 w-4 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">{totalReferrals}</div>
              <p className="text-xs text-muted-foreground mt-1">{activeReferrals} completed</p>
            </CardContent>
          </Card>
        </div>
        {/* Revenue & Performance Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Revenue Trend
              </CardTitle>
              <CardDescription>Monthly revenue over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Category Performance
              </CardTitle>
              <CardDescription>Orders and revenue by scrap category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryPerformanceChart />
            </CardContent>
          </Card>
        </div>

        {/* Agent & Service Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Top Performing Agents
              </CardTitle>
              <CardDescription>Agents ranked by completed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <AgentPerformanceChart />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-purple-600" />
                Service Bookings
              </CardTitle>
              <CardDescription>Distribution of service orders by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceStatsChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Volume */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 hover:shadow-lg transition-all duration-200 border-green-200 bg-gradient-to-br from-green-50/30 to-white dark:from-green-950/20 dark:to-background">
            <CardHeader className="flex flex-row items-center border-b pb-4">
              <div className="grid gap-1">
                <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                  <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-sm">
                  Latest scrap pickup orders • <span className="font-semibold text-green-600">{orders.length}</span> total orders
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1 bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/orders">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => {
                  const seller = users.find(u => u.id === order.sellerId)
                  if (!seller) return null
                  
                  const statusConfig = {
                    completed: { variant: 'default' as const, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    pending: { variant: 'secondary' as const, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
                    assigned: { variant: 'outline' as const, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    cancelled: { variant: 'destructive' as const, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' }
                  }
                  const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
                  
                  return (
                    <div key={order.id} className="flex items-center gap-4 p-3 rounded-lg border hover:border-green-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white dark:bg-background">
                      <Avatar className="h-12 w-12 border-2 border-green-100">
                        <AvatarImage src={seller.avatarUrl} />
                        <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                          {seller.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm truncate">{seller.name}</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {order.scrapCategory}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span className="truncate">{seller.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant={config.variant} className="text-xs capitalize">
                          {order.status}
                        </Badge>
                        <div className="text-right">
                          <p className="font-bold text-green-700 dark:text-green-400">
                            ₹{order.totalAmount?.toFixed(0) ?? 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.finalWeight?.toFixed(1) ?? '0.0'} kg
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 border-purple-200 bg-gradient-to-br from-purple-50/30 to-white dark:from-purple-950/20 dark:to-background">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <PieChart className="h-4 w-4 text-purple-600" />
                </div>
                Scrap Volume
              </CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ScrapVolumeChart />
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Weight</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">{totalWeight.toFixed(0)} kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">{totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg per Order</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">{(totalWeight / totalOrders).toFixed(1)} kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Full Width Chart */}
        <Card className="hover:shadow-lg transition-all duration-200 border-blue-200 bg-gradient-to-br from-blue-50/30 to-white dark:from-blue-950/20 dark:to-background">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                Daily Orders Trend
              </CardTitle>
              <CardDescription className="mt-1">Order volume and patterns over the past week</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                <Calendar className="h-4 w-4 mr-1" />
                Last 7 Days
              </Button>
              <Button variant="outline" size="sm" asChild className="hover:bg-green-50 hover:text-green-700 hover:border-green-300">
                <Link href="/dashboard/analytics">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  Full Report
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <OrdersChart />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">{completedOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{pendingOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{(totalOrders / 7).toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">Daily Avg</p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
