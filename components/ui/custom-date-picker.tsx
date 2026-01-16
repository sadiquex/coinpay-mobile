import React, { useState } from "react";
import { View, TouchableOpacity, Platform, Modal } from "react-native";
import { twMerge } from "tailwind-merge";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";
import { CustomText } from "./custom-text";

interface CustomDatePickerProps {
  /**
   * Label text to display above the input
   */
  label?: string;
  /**
   * Selected date value
   */
  value?: Date | null;
  /**
   * Callback when date is selected
   */
  onDateChange?: (date: Date) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Error state - applies error styling
   */
  error?: boolean;
  /**
   * Error message to display below the input
   */
  errorMessage?: string;
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
  /**
   * Custom container className
   */
  containerClassName?: string;
  /**
   * Maximum date that can be selected
   */
  maximumDate?: Date;
  /**
   * Minimum date that can be selected
   */
  minimumDate?: Date;
  /**
   * Date format for display (default: "MMM DD, YYYY")
   */
  dateFormat?: (date: Date) => string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onDateChange,
  placeholder = "Select date",
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  showLabel = true,
  containerClassName,
  maximumDate,
  minimumDate,
  dateFormat,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);

  // Default date formatter
  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    if (dateFormat) {
      return dateFormat(date);
    }

    // Default format: "MMM DD, YYYY" (e.g., "Jan 15, 2000")
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setIsOpen(false);
      if (event.type === "set" && selectedDate) {
        onDateChange?.(selectedDate);
      }
    } else {
      // iOS - we'll handle confirmation in the modal
      if (event.type === "set" && selectedDate) {
        onDateChange?.(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
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
    disabled && "opacity-60"
  );

  const displayValue = value ? formatDate(value) : "";
  const hasValue = !!value;

  return (
    <View className={twMerge("gap-1", containerClassName)}>
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

      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.7}
        className={containerClasses}
      >
        {/* Calendar Icon */}
        <View className="mr-2" pointerEvents="none">
          <Calendar size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
        </View>

        {/* Date Display */}
        <View className="flex-1" pointerEvents="none">
          <CustomText
            variant="body-1-regular"
            className={twMerge(
              "text-base",
              hasValue
                ? "text-[#121212] dark:text-white"
                : "text-gray-400 dark:text-gray-500",
              disabled && "text-gray-400 dark:text-gray-500"
            )}
          >
            {hasValue ? displayValue : placeholder}
          </CustomText>
        </View>
      </TouchableOpacity>

      {/* Error/Helper Text */}
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

      {/* Date Picker */}
      {Platform.OS === "ios" ? (
        <Modal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setIsOpen(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="rounded-t-3xl bg-white p-6 dark:bg-gray-800">
              <View className="mb-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <CustomText
                    variant="body-1-medium"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Cancel
                  </CustomText>
                </TouchableOpacity>
                <CustomText
                  variant="h4-semibold"
                  className="text-[#121212] dark:text-white"
                >
                  Select Date
                </CustomText>
                <TouchableOpacity onPress={handleConfirm}>
                  <CustomText
                    variant="body-1-medium"
                    className="text-[#304FFF]"
                  >
                    Done
                  </CustomText>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                themeVariant={isDark ? "dark" : "light"}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        isOpen && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            themeVariant={isDark ? "dark" : "light"}
          />
        )
      )}
    </View>
  );
};
