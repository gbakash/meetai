import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <DashboardSidebar />
        <main className="flex flex-col flex-1 bg-muted">
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
