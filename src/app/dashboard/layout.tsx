import ResizableSidebar from "@/components/resizable-sidebar";
import SidebarLayoutAdjuster from "@/components/sidebar-layout-adjuster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data for demo purposes
  const userData = {
    displayName: "Demo User",
    primaryEmail: "demo@example.com",
  };

  return (
    <div className="min-h-screen bg-background">
      <ResizableSidebar user={userData} />
      <SidebarLayoutAdjuster>
        {children}
      </SidebarLayoutAdjuster>
    </div>
  );
}
