
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { users } from "@/lib/data"
import AgentsTableClient from "@/components/dashboard/agents-table-client"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AgentsPage() {
  const agents = users.filter(user => user.role === 'agent');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Agent Management</CardTitle>
            <CardDescription>
            View, manage, and track your pickup agents.
            </CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Agent
        </Button>
      </CardHeader>
      <CardContent>
        <AgentsTableClient agents={agents} />
      </CardContent>
    </Card>
  )
}
