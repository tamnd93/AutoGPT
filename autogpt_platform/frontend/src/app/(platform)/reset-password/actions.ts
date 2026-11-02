"use server";
import { auth } from "@/lib/auth/auth";
import { readLocale } from "@/lib/i18n/server";
import { getMessage } from "@/lib/i18n/translate";
import * as Sentry from "@sentry/nextjs";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

export async function sendResetEmail(email: string) {
  return await Sentry.withServerActionInstrumentation(
    "sendResetEmail",
    {},
    async () => {
      const locale = await readLocale();
      const origin =
        process.env.BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
        "http://localhost:3000";

      try {
        // Better Auth emails a link that redirects to
        // `/reset-password?token=<token>` (or `?error=...` on failure).
        await auth.api.requestPasswordReset({
          body: {
            email,
            redirectTo: new URL("/reset-password", origin).toString(),
          },
        });
      } catch (error) {
        console.error("Error sending reset email", error);
        if (error instanceof APIError) {
          return error.body?.message || error.message;
        }
        return getMessage(locale, "auth1.reset.sendFailed");
      }
    },
  );
}

export async function changePassword(password: string, token: string) {
  return await Sentry.withServerActionInstrumentation(
    "changePassword",
    {},
    async () => {
      const locale = await readLocale();
      try {
        await auth.api.resetPassword({
          body: {
            newPassword: password,
            token,
          },
        });
      } catch (error) {
        console.error("Error changing password", error);
        if (error instanceof APIError) {
          return error.body?.message || error.message;
        }
        return getMessage(locale, "auth1.reset.changeFailed");
      }

      redirect("/login");
    },
  );
}
