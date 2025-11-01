import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Weight,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { orders, users } from "@/lib/data"
import OrdersChart from "@/components/dashboard/orders-chart"
import ScrapVolumeChart from "@/components/dashboard/scrap-volume-chart"

export default function Dashboard() {
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0)
    const completedOrders = orders.filter(o => o.status === 'completed').length
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'assigned').length
    const totalWeight = orders.reduce((acc, order) => acc + (order.finalWeight || 0), 0)
    const activeAgents = users.filter(u => u.role === 'agent').length

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Orders
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{completedOrders}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Weight Collected
              </CardTitle>
              <Weight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWeight.toFixed(2)} kg</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  An overview of the most recent scrap pickup orders.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/orders">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Category
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.slice(0, 5).map(order => {
                        const seller = users.find(u => u.id === order.sellerId)
                        return (
                            <TableRow key={order.id}>
                                <TableCell>
                                <div className="font-medium">{seller?.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    {seller?.email}
                                </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                {order.scrapCategory}
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                <Badge className="text-xs" variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                    {order.status}
                                </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">₹{order.totalAmount?.toFixed(2) ?? 'N/A'}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scrap Volume by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrapVolumeChart />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <Card>
                <CardHeader>
                    <CardTitle>Orders per Day</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <OrdersChart />
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
