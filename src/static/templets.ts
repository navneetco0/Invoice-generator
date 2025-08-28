export const templates = {
  modern: {
    name: "Modern",
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-gray-50",
      text: "text-gray-800",
      accent: "text-blue-600",
    },
  },
  classic: {
    name: "Classic",
    colors: {
      primary: "bg-gray-800",
      secondary: "bg-gray-100",
      text: "text-gray-900",
      accent: "text-gray-700",
    },
  },
  elegant: {
    name: "Elegant",
    colors: {
      primary: "bg-purple-600",
      secondary: "bg-purple-50",
      text: "text-gray-800",
      accent: "text-purple-600",
    },
  },
} as const;

// ✅ Types

export type TemplateKey = keyof typeof templates;
// "modern" | "classic" | "elegant"

export type Template = typeof templates[TemplateKey];
// Each template object type

export type TemplateColors = Template["colors"];
// { primary: string; secondary: string; text: string; accent: string; }
