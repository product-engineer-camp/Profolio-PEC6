import { useState } from "react";
import { ProfileInputType } from "./type";
import { ProfileQuestionAnswer } from "@/src/features/profiles/model/type";
import { INITIAL_PROFILE_INPUT } from "../lib/constants";

export const useProfileData = () => {
  const [profileInput, setProfileInput] = useState<ProfileInputType>(
    INITIAL_PROFILE_INPUT,
  );

  const updateBasicAnswers = (answers: ProfileQuestionAnswer) => {
    setProfileInput((prev) => ({
      ...prev,
      basicAnswers: answers,
    }));
  };

  const updateAIAnswers = (answers: ProfileQuestionAnswer) => {
    setProfileInput((prev) => ({
      ...prev,
      aiAnswers: answers,
    }));
  };

  const updateThemeId = (themeId: string) => {
    setProfileInput((prev) => ({
      ...prev,
      themeId,
    }));
  };

  return {
    profileInput,
    updateBasicAnswers,
    updateAIAnswers,
    updateThemeId,
  };
};
