"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { SortOption } from "../model/type";
import { SORT_OPTIONS } from "../model/constants";
import { useState } from "react";
import { getDropdownCurrentLabel } from "@/shared/lib/dropdown";

type ProfileSortingDropdownMenuProps = {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
  disabled?: boolean;
};

export function ProfileSortingDropdownMenu({
  onSort,
  currentSort,
  disabled,
}: ProfileSortingDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLabel = () => {
    return getDropdownCurrentLabel(SORT_OPTIONS, currentSort);
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          {getCurrentLabel()}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSort(option.value)}
            className={`cursor-pointer transition-colors ${
              option.value === currentSort
                ? "bg-accent font-medium"
                : "hover:bg-accent/80"
            }`}
            disabled={disabled}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
