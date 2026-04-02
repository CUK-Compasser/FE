"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OwnerSignupStep = "signup" | "business" | "register" | "done";

interface OwnerSignupState {
  step: OwnerSignupStep;
  signupCompleted: boolean;
  businessCompleted: boolean;
  registerCompleted: boolean;
  email: string | null;
  setSignupCompleted: (email: string) => void;
  setBusinessCompleted: () => void;
  setRegisterCompleted: () => void;
  resetSignupFlow: () => void;
}

export const useOwnerSignupStore = create<OwnerSignupState>()(
  persist(
    (set) => ({
      step: "signup",
      signupCompleted: false,
      businessCompleted: false,
      registerCompleted: false,
      email: null,

      setSignupCompleted: (email) =>
        set({
          step: "business",
          signupCompleted: true,
          businessCompleted: false,
          registerCompleted: false,
          email,
        }),

      setBusinessCompleted: () =>
        set((state) => ({
          ...state,
          step: "register",
          businessCompleted: true,
        })),

      setRegisterCompleted: () =>
        set((state) => ({
          ...state,
          step: "done",
          registerCompleted: true,
        })),

      resetSignupFlow: () =>
        set({
          step: "signup",
          signupCompleted: false,
          businessCompleted: false,
          registerCompleted: false,
          email: null,
        }),
    }),
    {
      name: "owner-signup-flow",
    },
  ),
);