"use client";
import { useContext } from "react";
import { BasicQAStep } from "@/src/features/profiles/ui/BasicQAStep";
import { ProfileCreateContext } from "../_model/context";

export default function Step1Page() {
  const { profile, updateProfile, goToNextStep } =
    useContext(ProfileCreateContext);

  const handleComplete = (answers: Record<string, any>) => {
    updateProfile({ basicAnswers: answers });
    goToNextStep();
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">기본 질문</h1>
      <BasicQAStep
        onComplete={handleComplete}
        initialAnswers={profile?.basicAnswers || {}}
      />
    </div>
  );
}
