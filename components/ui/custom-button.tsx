import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { CustomText } from "./custom-text";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

// Valid text variants for buttons
type TypographyVariant =
  | "body-1-regular"
  | "body-1-medium"
  | "body-2-regular"
  | "body-2-medium"
  | "body-2-semibold";

interface CustomButtonProps extends Omit<TouchableOpacityProps, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Variant styles
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-blue active:bg-primary-blue/80 disabled:bg-gray-300 dark:disabled:bg-gray-700",
  secondary:
    "bg-transparent border-2 border-primary-blue active:bg-primary-blue/10 active:border-primary-blue/80 disabled:border-gray-300 dark:active:bg-primary-blue/20 dark:disabled:border-gray-700",
};

// Size styles
const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "px-4 py-2",
    text: "body-2-medium",
  },
  md: {
    container: "px-6 py-3",
    text: "body-1-medium",
  },
  lg: {
    container: "px-8 py-4",
    text: "body-1-medium",
  },
};

// Text color styles
const textColorStyles: Record<ButtonVariant, string> = {
  primary: "text-white disabled:text-gray-500 dark:disabled:text-gray-400",
  secondary:
    "text-primary-blue disabled:text-gray-400 dark:text-primary-blue dark:disabled:text-gray-600",
};

export const CustomButton = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  CustomButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      children,
      className,
      leftIcon,
      rightIcon,
      onPress,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const sizeStyle = sizeStyles[size];

    const buttonClasses = twMerge(
      // Base styles
      "flex-row items-center justify-center rounded-full",
      // Variant styles
      variantStyles[variant],
      // Size styles
      sizeStyle.container,
      // Disabled state
      isDisabled && "opacity-60",
      // Custom className
      className
    );

    const textClasses = twMerge(
      textColorStyles[variant],
      leftIcon && "ml-2",
      rightIcon && "mr-2"
    );

    return (
      <TouchableOpacity
        ref={ref}
        className={buttonClasses}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? "#FFFFFF" : "primary-blue"}
          />
        ) : (
          <>
            {leftIcon && <View className="mr-2">{leftIcon}</View>}
            <CustomText
              variant={sizeStyle.text as TypographyVariant}
              className={textClasses}
            >
              {children}
            </CustomText>
            {rightIcon && <View className="ml-2">{rightIcon}</View>}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

CustomButton.displayName = "CustomButton";
