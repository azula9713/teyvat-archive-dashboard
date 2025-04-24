import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | Teyvat Archive Admin",
  description: "Create a new password for your account"
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a new password for your account
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
