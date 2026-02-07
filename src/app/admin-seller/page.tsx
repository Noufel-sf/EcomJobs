'use client';

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sun, Moon, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/Redux/hooks';
import { AdminAppSidebar } from './admin-app-sidebar';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartAreaInteractive } from './chart-area-interactive';

export default function AdminLayout({ children }) {
  const { setTheme } = useTheme();
  const user = useAppSelector((state) => state.auth.user);

  // Stats data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$1,250.00',
      change: '+12.5%',
      trend: 'up',
      description: 'Trending up this month',
      subtitle: 'Visitors for the last 6 months',
    },
    {
      title: 'New Customers',
      value: '1,234',
      change: '-20%',
      trend: 'down',
      description: 'Down 20% this period',
      subtitle: 'Acquisition needs attention',
    },
    {
      title: 'Active Accounts',
      value: '45,678',
      change: '+12.5%',
      trend: 'up',
      description: 'Strong user retention',
      subtitle: 'Engagement exceed targets',
    },
    {
      title: 'Growth Rate',
      value: '4.5%',
      change: '+4.5%',
      trend: 'up',
      description: 'Steady performance increase',
      subtitle: 'Meets growth projections',
    },
  ];

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AdminAppSidebar />

      {/* Main Content */}
      <SidebarInset>
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin-seller">Admin Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" className="cursor-pointer">
              <Link href="/">Home</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-md"
              >
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 px-6 py-8">
          <h1 className="font-medium text-xl mb-8">
            Welcome Back, <span>{user?.name}</span> 👋🏻
            <br />
            <span className="text-gray-600 dark:text-gray-400">
              Feel Free To Explore Your Dashboard!
            </span>
          </h1>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 ${
                      stat.trend === 'up'
                        ? 'text-green-600 dark:text-green-500'
                        : 'text-red-600 dark:text-red-500'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {stat.description}
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Section */}
          <div className="mb-8">
            <ChartAreaInteractive />
          </div>
        </div>

        {/* Page Body */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
