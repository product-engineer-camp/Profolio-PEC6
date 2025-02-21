export function getDropdownCurrentLabel<
  T extends { value: string; label: string },
>(options: T[], currentValue: string): string | undefined {
  return options.find((option) => option.value === currentValue)?.label;
}
