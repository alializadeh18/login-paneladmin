import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ورود به پنل ادمین",
  description: "صفحه ورود به پنل مدیریت",
};

const login = async (formData: FormData): Promise<void> => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(
      `${process.env.INTERNAL_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      let errorMessage = "خطا در ورود";
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        errorMessage = data.error || errorMessage;
      } catch {
        console.error("پاسخ غیر JSON از سرور:", text);
      }
      throw new Error(errorMessage);
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">ورود به پنل ادمین</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            برای ورود به پنل ادمین، لطفاً اطلاعات خود را وارد کنید.
          </p>
        </div>

        <form action={login} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-lg border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-lg border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
