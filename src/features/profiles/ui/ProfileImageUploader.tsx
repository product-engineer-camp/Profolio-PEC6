import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";

type ProfileImageUploaderProps = {
  onImageChange: (file: File) => void;
  imagePreview?: string;
};

export const ProfileImageUploader = ({
  onImageChange,
  imagePreview: externalImagePreview,
}: ProfileImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState(externalImagePreview || "");

  useEffect(() => {
    setImagePreview(externalImagePreview || "");
  }, [externalImagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative h-32 w-32">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile preview"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              <span className="text-4xl">👤</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="image">프로필 이미지</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
      </div>
    </div>
  );
};
