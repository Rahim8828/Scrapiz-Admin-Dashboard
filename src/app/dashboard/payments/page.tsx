import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { payments } from "@/lib/data"
import PaymentsTableClient from "@/components/dashboard/payments-table-client"

export default function PaymentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>
          Process and track payments to sellers and agents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentsTableClient payments={payments} />
      </CardContent>
    </Card>
  )
}
