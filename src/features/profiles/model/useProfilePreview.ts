import { useState } from "react";

type UseProfilePreviewReturn = {
  title: string;
  imageFile: File | null;
  imagePreview: string;
  handleTitleChange: (value: string) => void;
  handleImageChange: (file: File | null) => void;
};

export const useProfilePreview = (): UseProfilePreviewReturn => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return {
    title,
    imageFile,
    imagePreview,
    handleTitleChange,
    handleImageChange,
  };
};
