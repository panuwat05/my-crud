import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { studentSchema, type FormState } from "../validation";
import CreateStudentForm from "./create-student-form";

async function createStudent(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  "use server";

  const yearRaw = formData.get("year");

  const result = studentSchema.safeParse({
    studentCode: formData.get("studentCode"),
    name: formData.get("name"),
    email: formData.get("email"),
    major: formData.get("major"),
    // ช่องว่าง -> undefined เพื่อให้ Zod แจ้ง error แทน NaN/0
    year: yearRaw === null || yearRaw === "" ? undefined : Number(yearRaw),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await prisma.student.create({
      data: {
        ...result.data,
        email: result.data.email || null,
      },
    });
  } catch {
    return {
      success: false,
      errors: {
        studentCode: ["รหัสนักศึกษานี้มีอยู่แล้ว"],
      },
    };
  }

  // redirect() ต้องอยู่นอก try/catch เพราะทำงานด้วยการ throw
  redirect("/students");
}

export default function CreateStudentPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">เพิ่มนักศึกษา</h1>

        <p className="mt-2 text-gray-600">กรอกข้อมูลนักศึกษา</p>
      </div>

      <CreateStudentForm action={createStudent} />
    </main>
  );
}
