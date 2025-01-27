"use client";

import useAuthFormStore from "@/stores/useAuthFormStore";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const authMode = useAuthFormStore((state) => state.authMode);

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full bg-orange-500 border-0 hover:bg-orange-600">
      {pending ? (
        <span className="loading loading-spinner"></span>
      ) : authMode === "login" ? (
        "Sign In"
      ) : authMode === "register" ? (
        "Sign Up"
      ) : (
        "Send Reset Link"
      )}
    </button>
  );
}
