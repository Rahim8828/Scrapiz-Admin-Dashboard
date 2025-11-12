
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Home,
  ShoppingCart,
  Users,
  CreditCard,
  LineChart,
  Settings,
  Truck,
  Map,
  Wrench,
  Gift,
  Package,
  Layers,
  BarChart3,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/dashboard/service-orders', icon: Wrench, label: 'Services' },
  { href: '/dashboard/users', icon: Users, label: 'Users' },
  { href: '/dashboard/agents', icon: Truck, label: 'Agents' },
  { href: '/dashboard/referrals', icon: Gift, label: 'Referrals' },
  { href: '/dashboard/categories', icon: Layers, label: 'Categories' },
  { href: '/dashboard/items', icon: Package, label: 'Items' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/authentication', icon: Shield, label: 'Auth' },
  { href: '/dashboard/areas', icon: Map, label: 'Areas' },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 text-lg font-bold md:h-8 md:w-8 md:text-base transition-all"
        >
          <span className="text-xl font-bold text-white transition-all group-hover:scale-110">S</span>
          <span className="sr-only">Scrapiz Admin</span>
        </Link>
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    (item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href))
                      ? 'bg-accent text-accent-foreground'
                      : ''
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname.startsWith('/dashboard/settings') ? 'bg-accent text-accent-foreground' : ''
                    )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
