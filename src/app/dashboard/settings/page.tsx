import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Settings</CardTitle>
            <CardDescription>
              Manage your admin account and site settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-3">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  defaultValue="Vikram Bose"
                />
              </div>
              <div className="grid gap-3">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  className="w-full"
                  defaultValue="vikram.bose@example.com"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Manage integrations with third-party services.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="google-maps"
                className="flex flex-col gap-1 text-sm font-medium"
              >
                Google Maps API
              </label>
              <Button variant="outline">Connect</Button>
            </div>
             <div className="flex items-center justify-between">
              <label
                htmlFor="payment-gateway"
                className="flex flex-col gap-1 text-sm font-medium"
              >
                Payment Gateway (Razorpay/Stripe)
              </label>
              <Button variant="outline">Connect</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
