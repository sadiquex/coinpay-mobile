import React from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Current step (1-indexed, e.g., 1 for first step, 2 for second step)
   */
  currentStep: number;
  /**
   * Height of the progress bar (default: 3px)
   */
  height?: number | string;
  /**
   * Color for completed portion (default: primary-blue)
   */
  activeColor?: string;
  /**
   * Color for remaining portion (default: gray-200)
   */
  inactiveColor?: string;
  /**
   * Custom container className
   */
  className?: string;
  /**
   * Whether to show dark mode support
   */
  showDarkMode?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalSteps,
  currentStep,
  height = 3,
  activeColor = "bg-primary-blue",
  inactiveColor = "bg-gray-200",
  className,
  showDarkMode = false,
}) => {
  // Ensure currentStep is within valid range
  const validCurrentStep = Math.max(1, Math.min(currentStep, totalSteps));

  // Calculate the percentage of completion
  const progressPercentage = (validCurrentStep / totalSteps) * 100;
  const remainingPercentage = 100 - progressPercentage;

  // Convert height to number (pixels) for style
  const heightValue =
    typeof height === "string"
      ? parseFloat(
          height.replace("px", "").replace("rem", "").replace("em", "")
        ) || 3
      : height;

  return (
    <View className={twMerge("mt-2 flex-row items-center", className)}>
      {/* Completed portion */}
      {progressPercentage > 0 && (
        <View
          className={twMerge(
            activeColor,
            showDarkMode && "dark:bg-primary-blue"
          )}
          style={{
            height: heightValue,
            width: `${progressPercentage}%`,
          }}
        />
      )}

      {/* Remaining portion */}
      {remainingPercentage > 0 && (
        <View
          className={twMerge(inactiveColor, showDarkMode && "dark:bg-gray-700")}
          style={{
            height: heightValue,
            width: `${remainingPercentage}%`,
          }}
        />
      )}
    </View>
  );
};
