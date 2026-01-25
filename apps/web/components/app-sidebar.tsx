"use client";

import { Badge } from "@repo/ui/components/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@repo/ui/components/sidebar";
import { Home, LibraryBig, Upload } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";

import { $api } from "@/features/api/client";
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

  const params = useParams<{ id?: string; number?: string }>();

  const { data: openedBook } = $api.useQuery(
    "get",
    "/books/{id}",
    {
      params: {
        path: {
          id: params.id!,
        },
      },
    },
    { enabled: !!params?.id },
  );

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
          <SidebarSeparator className="my-4" />
          {openedBook?.chapters && (
            <>
              <p className="ml-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {openedBook.title}
              </p>
              {openedBook.chapters.map((chapter) => {
                return (
                  <SidebarMenuItem key={chapter.number}>
                    <SidebarMenuButton
                      asChild
                      isActive={Number(params.number) === chapter.number}
                    >
                      <Link
                        href={`/books/${params.id}/chapters/${chapter.number}`}
                      >
                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                          {chapter.number}
                        </Badge>
                        {chapter.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
