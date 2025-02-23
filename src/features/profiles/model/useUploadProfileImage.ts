import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "../api/uploadProfileImage";

type UploadImageParams = {
  file?: File;
  profileId?: string;
};

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: ({ file, profileId }: UploadImageParams) =>
      uploadProfileImage(file, profileId),
  });
};
