import Link from "next/link";
import { auth, signOut } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mt-2 text-gray-600">
        สวัสดี {session.user.name ?? session.user.email} (สิทธิ์:{" "}
        {session.user.role})
      </p>

      <div className="mt-6 flex gap-3">
        <Link href="/" className="text-blue-600 hover:underline">
          หน้าแรก
        </Link>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="text-red-600 hover:underline">ออกจากระบบ</button>
        </form>
      </div>
    </main>
  );
}
