export type ProfileStep = 1 | 2 | 3 | 4;

export type Profile = {
  basicAnswers: {
    [key: string]: string | number | string[];
  };
  aiAnswers?: {
    [key: string]: string;
  };
  preview?: {
    title: string;
    description: string;
    tags: string[];
  };
};

export type ProfileContext = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  currentStep: ProfileStep;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateProfile: (data: Partial<Profile>) => void;
};
