import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";
import { CustomText } from "./custom-text";

interface CustomInputProps extends Omit<TextInputProps, "style"> {
  /**
   * Left icon to display inside the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon to display inside the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Callback function when right icon is pressed
   */
  onRightIconPress?: () => void;
  /**
   * Whether the input should be a password field with show/hide toggle
   * When true, automatically shows an eye icon on the right
   */
  secureTextEntry?: boolean;
  /**
   * Custom container className
   */
  containerClassName?: string;
  /**
   * Custom input className
   */
  className?: string;
  /**
   * Error state - applies error styling
   */
  error?: boolean;
  /**
   * Error message to display below the input
   */
  errorMessage?: string;
  /**
   * Label text to display above the input
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Whether to show the label
   */
  showLabel?: boolean;
}

export const CustomInput = React.forwardRef<TextInput, CustomInputProps>(
  (
    {
      leftIcon,
      rightIcon,
      onRightIconPress,
      secureTextEntry = false,
      containerClassName,
      className,
      error = false,
      errorMessage,
      label,
      helperText,
      disabled = false,
      placeholderTextColor,
      showLabel = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isDark = theme === "dark";

    // Default placeholder color based on theme
    const defaultPlaceholderColor = isDark ? "#9CA3AF" : "#9CA3AF";

    // Determine if we should show password toggle
    const showPasswordToggle = secureTextEntry;
    const actualSecureTextEntry = secureTextEntry && !isPasswordVisible;

    // Handle password visibility toggle
    const handlePasswordToggle = () => {
      setIsPasswordVisible(!isPasswordVisible);
      onRightIconPress?.();
    };

    // Container styles
    const containerClasses = twMerge(
      // Base styles
      "flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white/60 p-2",
      // Dark mode
      "dark:border-gray-700 dark:bg-gray-800",
      // Error state
      error && "border-red-500 dark:border-red-500",
      // Disabled state
      disabled && "opacity-60",
      // Custom className
      containerClassName
    );

    // Input styles
    const inputClasses = twMerge(
      // Base styles
      "flex-1 text-base",
      // Text color
      "text-[#121212] dark:text-white",
      // Disabled text color
      disabled && "text-gray-400 dark:text-gray-500",
      // Custom className
      className
    );

    // Determine right icon to display
    const renderRightIcon = () => {
      if (showPasswordToggle) {
        return (
          <TouchableOpacity
            onPress={handlePasswordToggle}
            activeOpacity={0.7}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
            ) : (
              <Eye size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
            )}
          </TouchableOpacity>
        );
      }

      if (rightIcon) {
        if (onRightIconPress) {
          return (
            <TouchableOpacity
              onPress={onRightIconPress}
              activeOpacity={0.7}
              disabled={disabled}
            >
              {rightIcon}
            </TouchableOpacity>
          );
        }
        return <View>{rightIcon}</View>;
      }

      return null;
    };

    return (
      <View className={`gap-1 ${containerClassName}`}>
        {showLabel && label && (
          <CustomText
            variant="label-1-medium"
            className={twMerge(
              "text-gray-400 dark:text-gray-300",
              error && "text-red-500 dark:text-red-400"
            )}
          >
            {label}
          </CustomText>
        )}

        <View className={containerClasses}>
          {leftIcon && (
            <View className="mr-2" pointerEvents="none">
              {leftIcon}
            </View>
          )}

          <TextInput
            ref={ref}
            className={inputClasses}
            secureTextEntry={actualSecureTextEntry}
            placeholderTextColor={
              placeholderTextColor || defaultPlaceholderColor
            }
            editable={!disabled}
            {...props}
          />

          {renderRightIcon()}
        </View>

        {(errorMessage || helperText) && (
          <>
            {error && errorMessage ? (
              <CustomText
                variant="body-3-regular"
                className="text-red-500 dark:text-red-400"
              >
                {errorMessage}
              </CustomText>
            ) : (
              helperText && (
                <CustomText
                  variant="body-3-regular"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {helperText}
                </CustomText>
              )
            )}
          </>
        )}
      </View>
    );
  }
);

CustomInput.displayName = "CustomInput";
