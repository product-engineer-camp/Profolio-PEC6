/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        mobile: "375px", // <-- *신규로 추가한 모바일 스크린용 breakpoint prefix
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "pattern-solid": "none",
        "pattern-gradient": "linear-gradient(45deg, var(--tw-gradient-stops))",
        "pattern-dots": "radial-gradient(currentColor 2px, transparent 2px)",
        "pattern-stripes":
          "linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%, transparent)",
        "pattern-waves": `
          linear-gradient(45deg, currentColor 25%, transparent 25%),
          linear-gradient(-45deg, currentColor 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, currentColor 75%),
          linear-gradient(-45deg, transparent 75%, currentColor 75%)
        `,
        "pattern-zigzag": `
          radial-gradient(100% 100% at 100% 0, currentColor 4%, 
            currentColor 4% 14%, transparent 14% 24%, 
            currentColor 22% 34%, transparent 34% 44%, 
            currentColor 44% 56%, transparent 56% 66%, 
            currentColor 66% 76%, transparent 76% 86%, 
            currentColor 86% 96%, transparent 96%),
          radial-gradient(100% 100% at 0 100%, transparent,
            #0008 4%,
            currentColor 4% 14%, transparent 14% 24%, 
            currentColor 22% 34%, transparent 34% 44%, 
            currentColor 44% 56%, transparent 56% 66%, 
            currentColor 66% 76%, transparent 76% 86%, 
            currentColor 86% 96%, transparent 96%)
        `,
        "pattern-square": `
          linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),
          linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)
        `,
      },
      backgroundSize: {
        "size-dots": "16px 16px",
        "size-stripes": "16px 16px",
        "size-waves": "16px 16px",
        "size-zigzag": "100px 100px",
        "size-square": "16px 16px",
      },
      backgroundPosition: {
        "pos-zigzag": "0 0, 10px 0, 10px -10px, 0 10px",
        "pos-square": "0 0, 8px 8px",
      },
    },
  },
  safelist: [
    "bg-pattern-solid",
    "bg-pattern-gradient",
    "bg-pattern-dots",
    "bg-pattern-stripes",
    "bg-pattern-waves",
    "bg-pattern-zigzag",
    "bg-size-dots",
    "bg-size-stripes",
    "bg-size-waves",
    "bg-size-zigzag",
    "bg-pos-waves",
    "bg-pos-zigzag",
    "bg-repeat",
  ],
  plugins: [require("tailwindcss-animate")],
};
