import { AppSidebar } from "@/components/app-sidebar";
import { SearchForm } from "@/components/search-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Bell, HelpCircle, MessageSquareMore, Settings2 } from "lucide-react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar className="px-2 py-7" />
      <SidebarInset className="bg-[#F6F8FA]">
        <header className="flex h-20 shrink-0 items-center gap-2 px-2">
          <div className="w-full flex items-center justify-between gap-4">
            <SearchForm className="w-[55%]" />

            <div className="flex flex-row justify-between items-center w-2/5 pr-5 text-[#808281]">
              <HelpCircle className="w-6 h-6" />
              <MessageSquareMore className="w-6 h-6" />
              <Settings2 className="w-6 h-6" />
              <Bell className="w-6 h-6" />

              <div className="flex flex-row items-center justify-center gap-6">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={38}
                  height={38}
                  className="rounded-md"
                />
                <p className="font-bold text-black text-lg">Aeline H. Dancy</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-4">
          <div className="min-h-fit flex-1 rounded-xl bg-white md:min-h-min p-4">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
