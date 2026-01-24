"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Home, LibraryBig, Upload } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { NavUser } from "@/features/user/NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menuItems = [
    {
      icon: Home,
      isActive: false,
      title: "Home",
      url: "/",
    },
    {
      icon: Upload,
      isActive: false,
      title: "Add book",
      url: "/upload",
    },
    {
      icon: LibraryBig,
      title: "Library",
      url: "/books",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <header className="h-16"></header>
      <SidebarContent>
        <SidebarGroup className="list-none">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
