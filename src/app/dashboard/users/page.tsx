import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { users } from "@/lib/data"
import UsersTableClient from "@/components/dashboard/users-table-client"

export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage all users including sellers, agents, and buyers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTableClient users={users} />
      </CardContent>
    </Card>
  )
}
