import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { serviceAreas } from "@/lib/data"
import AreasTableClient from "@/components/dashboard/areas-table-client"

export default function AreasPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Area Management</CardTitle>
        <CardDescription>
          Add, remove, and manage service areas and pincodes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreasTableClient initialAreas={serviceAreas} />
      </CardContent>
    </Card>
  )
}
