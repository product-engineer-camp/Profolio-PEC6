import { useMutation } from "@tanstack/react-query";
import type { Profile } from "@/entities/profile/model/types";

export const useCreateProfile = () => {
  return useMutation({
    mutationFn: async (profile: Profile) => {
      // TODO: Implement profile creation API call
      return profile;
    },
  });
};
