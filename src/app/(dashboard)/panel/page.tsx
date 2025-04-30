import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

async function getDashboardData() {
  const [userCount, orderCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    }),
  ]);

  return {
    userCount,
    orderCount,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
}

export default async function PanelPage() {
  const { userCount, orderCount, totalRevenue } = await getDashboardData();

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">خوش آمدید 👋</h1>
        <p className="text-muted-foreground">آمار و اطلاعات کلی سیستم</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">سفارشات جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">درآمد ماهانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue.toLocaleString()} تومان
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">بازدید امروز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
