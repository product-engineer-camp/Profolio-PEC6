"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { SortOption, SORT_OPTIONS } from "../model/type";
import { useState } from "react";

type ProfileSortingDropdownMenuProps = {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
};

export function ProfileSortingDropdownMenu({
  onSort,
  currentSort,
}: ProfileSortingDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLabel = () => {
    return SORT_OPTIONS.find((option) => option.value === currentSort)?.label;
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
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
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
