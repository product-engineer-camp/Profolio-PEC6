import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { useThemeListHeaderNavigation } from "../model/useThemeListHeaderNavigation";

export const DefaultThemeListActionDropdown = () => {
  const { navigateToDelete, navigateToThemeCreate } =
    useThemeListHeaderNavigation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="pastelPurple" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">편집 메뉴 열기</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-primary focus:text-primary"
          onClick={navigateToThemeCreate}
        >
          <Plus className="mr-2 h-4 w-4" />
          생성
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={navigateToDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
