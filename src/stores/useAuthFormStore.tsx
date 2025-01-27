import { create } from "zustand";

type AuthMode = "login" | "register" | "forgot";

interface AuthState {
  authMode: AuthMode;
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  setAuthMode: (mode: AuthMode) => void;
  setShowPassword: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (message: string | null) => void;
  resetMessages: () => void;
}

const useAuthFormStore = create<AuthState>((set) => ({
  authMode: "login",
  showPassword: false,
  isLoading: false,
  error: null,
  success: null,

  setAuthMode: (mode) =>
    set({
      authMode: mode,
      error: null,
      success: null,
    }),

  setShowPassword: (show) =>
    set({
      showPassword: show,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
      success: null,
    }),

  setSuccess: (message) =>
    set({
      success: message,
      error: null,
    }),

  resetMessages: () =>
    set({
      error: null,
      success: null,
    }),
}));

export default useAuthFormStore;
