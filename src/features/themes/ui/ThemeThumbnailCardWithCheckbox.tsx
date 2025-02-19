import { memo } from "react";
import {
  ThemeThumbnailCard,
  ThemeThumbnailCardProps,
} from "@/entities/themes/ui/ThemeThumbnailCard";
import { Checkbox } from "@/shared/ui/checkbox";

type ThemeThumbnailCardWithCheckboxProps = ThemeThumbnailCardProps & {
  isChecked: boolean;
  onToggleCheck: (id: number) => void;
};

export const ThemeThumbnailCardWithCheckbox = memo(
  ({
    id,
    isChecked,
    onToggleCheck,
    ...themeProps
  }: ThemeThumbnailCardWithCheckboxProps) => {
    return (
      <div className="flex items-center gap-4">
        <Checkbox
          id={`theme-${id}`}
          checked={isChecked}
          onCheckedChange={() => onToggleCheck(id)}
        />
        <div className="flex-1">
          <ThemeThumbnailCard id={id} {...themeProps} />
        </div>
      </div>
    );
  },
  (prev, next) => prev.id === next.id && prev.isChecked === next.isChecked,
);
