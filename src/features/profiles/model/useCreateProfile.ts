import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createProfile } from "../api/createProfile";

export const useCreateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      if (data.success && data.data) {
        router.push("/profiles");
      }
    },
  });
};
