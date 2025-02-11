import { SelectThemeList } from '@/features/themes/ui/SelectThemeList';
import { CreateThemeButton } from '@/features/themes/ui/CreateThemeButton';
import { SelectThemeCardProvider } from '@/features/themes/lib/SelectThemeCardProvider';

export function ThemeListManagement() {
  const handleDelete = (ids: string[]) => {
    // 삭제 로직
  };

  const handleSelect = (ids: string[]) => {
    // 선택 로직
  };

  return (
    <div className="theme-management">
      <SelectThemeCardProvider
        onDelete={handleDelete}
        onSelect={handleSelect}
      >
        <div className="theme-management__header">
          <h2>테마 관리</h2>
          <CreateThemeButton />
        </div>
        <SelectThemeList />
      </SelectThemeCardProvider>
    </div>
  );
} 