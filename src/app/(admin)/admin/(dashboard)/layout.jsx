import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AdminSidebar />
      <div className="relative min-h-0 min-w-0 flex-1 overflow-y-auto">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(139,200,58,0.08),transparent_42%),radial-gradient(ellipse_at_100%_0%,rgba(74,144,226,0.1),transparent_40%)]"
          aria-hidden
        />
        <div className="relative p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
