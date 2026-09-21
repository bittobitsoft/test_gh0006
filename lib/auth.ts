import "server-only";
import { cookies } from "next/headers";

const SESSION_COOKIE = "northstar_admin_session";

/** Compares the HTTP-only cookie with the server-only token before protected UI renders. */
export async function isAdminSessionValid() {
  const sessionToken = (await cookies()).get(SESSION_COOKIE)?.value;
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;
  if (!expectedToken) return false;
  return sessionToken === expectedToken;
}

export { SESSION_COOKIE };
