"use client";

import useAuthFormStore from "@/stores/useAuthFormStore";
import {
  Warning,
  CheckCircle,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { signInWithEmail, signUpWithEmail, resetPassword } from "./../action";
import { SubmitButton } from "./SubmitButton";

const AuthForm = () => {
  const {
    authMode,
    showPassword,
    error,
    success,
    setAuthMode,
    setShowPassword,
    resetMessages,
    setError,
    setSuccess,
  } = useAuthFormStore();

  const handleSubmit = async (formData: FormData) => {
    const action =
      authMode === "login"
        ? signInWithEmail
        : authMode === "register"
        ? signUpWithEmail
        : resetPassword;

    const result = await action(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert alert-error rounded-lg mb-4">
          <Warning className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success rounded-lg mb-4">
          <CheckCircle className="h-5 w-5" />
          <span>{success}</span>
        </div>
      )}

      <label className="input input-bordered flex items-center gap-2">
        <span className="bg-zinc-800 text-zinc-400">
          <Envelope size={20} />
        </span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="grow"
          required
        />
      </label>

      {authMode !== "forgot" && (
        <label className="input input-bordered flex items-center gap-2">
          <span className="bg-zinc-800 text-zinc-400">
            <Lock size={20} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="grow"
            required
          />
          <span
            className="bg-zinc-800 text-zinc-400"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
          </span>
        </label>
      )}

      {authMode === "register" && (
        <label className="input input-bordered flex items-center gap-2">
          <span className="bg-zinc-800 text-zinc-400">
            <Lock size={20} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="grow"
            required
          />
        </label>
      )}

      {authMode === "login" && (
        <button
          type="button"
          onClick={() => {
            setAuthMode("forgot");
            resetMessages();
          }}
          className="btn btn-link text-orange-500">
          Forgot password?
        </button>
      )}

      <SubmitButton />
    </form>
  );
};

export default AuthForm;
