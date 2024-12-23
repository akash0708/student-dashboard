"use client";
import {
  Home,
  Users,
  Book,
  HelpCircle,
  BarChart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navMain = [
  {
    title: "items",
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: Home,
      },
      {
        title: "Students",
        url: "/dashboard",
        icon: Users,
      },
      {
        title: "Chapter",
        url: "/dashboard/chapter",
        icon: Book,
      },
      {
        title: "Help",
        url: "#",
        icon: HelpCircle,
      },
      {
        title: "Reports",
        url: "#",
        icon: BarChart,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeLink, setActiveLink] = useState<string>();

  const pathName = usePathname();

  useEffect(() => {
    setActiveLink(pathName);
  }, [pathName]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image src={logo} alt="Logo" width={120} height={40} />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.url === activeLink}
                    >
                      <Link
                        href={item.url}
                        className={`px-[18px] flex items-center gap-3 font-bold text-[16px] text-[#6F767E] ${
                          item.url === activeLink
                            ? "font-extrabold text-black"
                            : ""
                        }`}
                      >
                        <item.icon className="w-8 h-8" strokeWidth={3} />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
