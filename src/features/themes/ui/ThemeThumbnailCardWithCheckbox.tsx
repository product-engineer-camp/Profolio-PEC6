import { memo } from "react";
import {
  ThemeThumbnailCard,
  ThemeThumbnailCardProps,
} from "@/entities/themes/ui/ThemeThumbnailCard";
import { Checkbox } from "@/shared/ui/checkbox";

type ThemeThumbnailCardWithCheckboxProps = ThemeThumbnailCardProps & {
  onToggleCheck: (id: number) => void;
};

export const ThemeThumbnailCardWithCheckbox = memo(
  ({
    id,
    onToggleCheck,
    ...themeProps
  }: ThemeThumbnailCardWithCheckboxProps) => {
    return (
      <div className="flex items-center gap-4">
        <Checkbox id={`theme-${id}`} onClick={() => onToggleCheck(id)} />
        <div className="flex-1">
          <ThemeThumbnailCard id={id} {...themeProps} />
        </div>
      </div>
    );
  },
);
