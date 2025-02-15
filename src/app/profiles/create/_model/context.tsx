"use client";
import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Profile,
  ProfileContext,
  ProfileStep,
} from "@/entities/profile/model/profile.type";

export const ProfileCreateContext = createContext<ProfileContext>({
  profile: null,
  setProfile: () => {},
  currentStep: 1,
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  updateProfile: () => {},
});

export function ProfileCreateProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentStep, setCurrentStep] = useState<ProfileStep>(1);
  const router = useRouter();

  const goToNextStep = () => {
    if (currentStep < 4) {
      const nextStep = (currentStep + 1) as ProfileStep;
      setCurrentStep(nextStep);
      router.push(`/profiles/create/step${nextStep}`);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = (currentStep - 1) as ProfileStep;
      setCurrentStep(prevStep);
      router.push(`/profiles/create/step${prevStep}`);
    }
  };

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...data }) as Profile);
  };

  return (
    <ProfileCreateContext.Provider
      value={{
        profile,
        setProfile,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        updateProfile,
      }}
    >
      {children}
    </ProfileCreateContext.Provider>
  );
}
