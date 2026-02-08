'use client';

import { AppSidebar } from '@/components/app-sidebar';
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

export default function MyAccount() {
  return (
    <SidebarProvider
      open={undefined}
      onOpenChange={undefined}
      className=""
      style={undefined}
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset className="">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" onClick={undefined} />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList className="">
              <BreadcrumbItem className="">
                <BreadcrumbLink href="/account" asChild={false} className="">
                  My Account
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator children={undefined} className="" />
              <BreadcrumbItem className="">
                <BreadcrumbPage className="">Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Page Body */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="text-2xl font-bold">Welcome to your Dashboard 🎉</div>

         
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
