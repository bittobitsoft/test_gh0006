"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/auth";

/** Validates credentials, then creates a short-lived HTTP-only session before redirecting to admin. */
export async function createAdminSession(formData: FormData) {
  const password = formData.get("password");
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;
  if (
    typeof password !== "string" ||
    !expectedPassword ||
    !sessionToken ||
    password !== expectedPassword
  ) {
    redirect("/login?error=invalid");
  }
  (await cookies()).set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

/** Removes the session cookie so a later visit to /admin must authenticate again. */
export async function logoutAdmin() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
