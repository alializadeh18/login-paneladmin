import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { redirect } from "next/navigation";

async function logout() {
  "use server";

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/auth/logout`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    redirect("/login");
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-l bg-card p-6">
        <div className="flex items-center gap-2 mb-8">
          <ChevronRight className="h-6 w-6" />
          <h2 className="text-2xl font-bold">پنل ادمین</h2>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-5 w-5" />
            داشبورد
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="h-5 w-5" />
            کاربران
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-5 w-5" />
            تنظیمات
          </Button>
        </nav>

        <div className="mt-auto pt-4">
          <form action={logout}>
            <Button
              type="submit"
              variant="destructive"
              className="w-full justify-start gap-2"
            >
              <LogOut className="h-5 w-5" />
              خروج
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
