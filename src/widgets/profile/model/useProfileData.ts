import { useState } from "react";
import { ProfileInputType } from "./type";
import { BasicQAAnswers } from "@/src/features/profiles/model/type";
import { INITIAL_PROFILE_INPUT } from "../lib/constants";

export const useProfileData = () => {
  const [profileInput, setProfileInput] = useState<ProfileInputType>(
    INITIAL_PROFILE_INPUT,
  );

  const updateBasicAnswers = (answers: BasicQAAnswers) => {
    setProfileInput((prev) => ({
      ...prev,
      basicAnswers: answers,
    }));
  };

  const updateAIAnswers = (answers: BasicQAAnswers) => {
    setProfileInput((prev) => ({
      ...prev,
      aiAnswers: answers,
    }));
  };

  return {
    profileInput,
    updateBasicAnswers,
    updateAIAnswers,
  };
};
