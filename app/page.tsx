import Link from "next/link";
import { auth } from "@/app/auth";

export default async function HomePage() {
  const session = await auth();

  const links = [
    { href: "/students", label: "จัดการนักศึกษา (CRUD)" },
    { href: "/blogs", label: "บล็อก (Loading / Suspense / not-found)" },
    { href: "/skeleton", label: "ตัวอย่าง Skeleton" },
    { href: "/admin", label: "Admin (เฉพาะ ADMIN)" },
    { href: "/dashboard", label: "Dashboard (ต้อง Login)" },
  ];

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-gray-900">Next.js Demo</h1>

      <p className="mt-2 text-gray-600">
        {session?.user
          ? `เข้าสู่ระบบแล้ว: ${session.user.name ?? session.user.email} (${session.user.role})`
          : "ยังไม่ได้เข้าสู่ระบบ"}
      </p>

      <ul className="mt-6 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-blue-600 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3 text-sm">
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
        <Link href="/login-github" className="text-blue-600 hover:underline">
          Login (GitHub, server action)
        </Link>
      </div>
    </main>
  );
}
