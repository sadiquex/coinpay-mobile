import React from "react";
import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

// Typography variants with font weight included
type TypographyVariant =
  // Heading variants
  | "h1-medium"
  | "h1-semibold"
  | "h1-bold"
  | "h2-medium"
  | "h2-semibold"
  | "h2-bold"
  | "h3-medium"
  | "h3-semibold"
  | "h3-bold"
  | "h4-medium"
  | "h4-semibold"
  | "h4-bold"
  // Body variants
  | "body-1-regular"
  | "body-1-medium"
  | "body-2-regular"
  | "body-2-medium"
  | "body-2-semibold"
  | "body-3-regular"
  | "body-3-medium"
  // Label variants
  | "label-1-regular"
  | "label-1-medium"
  | "label-1-semibold"
  | "label-1-bold"
  | "label-2-regular"
  | "label-2-medium"
  | "label-2-semibold"
  | "label-2-bold"
  // Caption variants
  | "caption-regular"
  | "caption-medium";

interface CustomTextProps extends TextProps {
  className?: string;
  variant?: TypographyVariant;
  children: React.ReactNode;
}

// Comprehensive variant styles mapping with dark mode support
const variantStyles: Record<TypographyVariant, string> = {
  // Heading variants
  "h1-medium":
    "text-4xl font-medium text-gray-900 dark:text-white leading-tight",
  "h1-semibold":
    "text-4xl font-semibold text-gray-900 dark:text-white leading-tight",
  "h1-bold": "text-4xl font-bold text-gray-900 dark:text-white leading-tight",
  "h2-medium":
    "text-3xl font-medium text-gray-900 dark:text-white leading-tight",
  "h2-semibold":
    "text-3xl font-semibold text-gray-900 dark:text-white leading-tight",
  "h2-bold": "text-3xl font-bold text-gray-900 dark:text-white leading-tight",
  "h3-medium":
    "text-2xl font-medium text-gray-900 dark:text-white leading-tight",
  "h3-semibold":
    "text-2xl font-semibold text-gray-900 dark:text-white leading-tight",
  "h3-bold": "text-2xl font-bold text-gray-900 dark:text-white leading-tight",
  "h4-medium":
    "text-xl font-medium text-gray-900 dark:text-white leading-tight",
  "h4-semibold":
    "text-xl font-semibold text-gray-900 dark:text-white leading-tight",
  "h4-bold": "text-xl font-bold text-gray-900 dark:text-white leading-tight",

  // Body variants
  "body-1-regular":
    "text-base font-normal text-gray-900 dark:text-gray-100 leading-normal",
  "body-1-medium":
    "text-base font-medium text-gray-900 dark:text-gray-100 leading-normal",
  "body-2-regular":
    "text-sm font-normal text-gray-700 dark:text-gray-300 leading-normal",
  "body-2-medium":
    "text-sm font-medium text-gray-700 dark:text-gray-300 leading-normal",
  "body-2-semibold":
    "text-sm font-semibold text-gray-700 dark:text-gray-300 leading-normal",
  "body-3-regular":
    "text-xs font-normal text-gray-600 dark:text-gray-400 leading-normal",
  "body-3-medium":
    "text-xs font-medium text-gray-600 dark:text-gray-400 leading-normal",

  // Label variants
  "label-1-regular":
    "text-base font-normal text-gray-700 dark:text-gray-300 leading-normal",
  "label-1-medium":
    "text-base font-medium text-gray-700 dark:text-gray-300 leading-normal",
  "label-1-semibold":
    "text-base font-semibold text-gray-700 dark:text-gray-300 leading-normal",
  "label-1-bold":
    "text-base font-bold text-gray-700 dark:text-gray-300 leading-normal",
  "label-2-regular":
    "text-sm font-normal text-gray-700 dark:text-gray-300 leading-normal",
  "label-2-medium":
    "text-sm font-medium text-gray-700 dark:text-gray-300 leading-normal",
  "label-2-semibold":
    "text-sm font-semibold text-gray-700 dark:text-gray-300 leading-normal",
  "label-2-bold":
    "text-sm font-bold text-gray-700 dark:text-gray-300 leading-normal",

  // Caption variants
  "caption-regular":
    "text-xs font-normal text-gray-500 dark:text-gray-400 leading-normal",
  "caption-medium":
    "text-xs font-medium text-gray-500 dark:text-gray-400 leading-normal",
};

export const CustomText = React.forwardRef<Text, CustomTextProps>(
  ({ variant = "body-1-regular", className, children, ...props }, ref) => {
    const textStyle = twMerge(variantStyles[variant], className);

    return (
      <Text ref={ref} className={textStyle} {...props}>
        {children}
      </Text>
    );
  }
);

CustomText.displayName = "CustomText";
