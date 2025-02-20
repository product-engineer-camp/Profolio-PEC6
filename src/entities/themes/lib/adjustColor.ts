export const adjustColor = (color: string, amount: number = -20): string => {
  const clamp = (num: number) => Math.min(255, Math.max(0, num));

  // HEX to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Adjust color
  const adjustR = clamp(r + amount);
  const adjustG = clamp(g + amount);
  const adjustB = clamp(b + amount);

  // RGB to HEX
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(adjustR)}${toHex(adjustG)}${toHex(adjustB)}`;
};
