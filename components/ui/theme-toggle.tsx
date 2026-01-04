import { useTheme } from "@/contexts/theme-context";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomText } from "./custom-text";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="flex-row items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 active:opacity-70 dark:bg-gray-800"
    >
      <View className="h-5 w-5 items-center justify-center">
        {isDark ? (
          <Moon size={18} color="#FBBF24" fill="#FBBF24" />
        ) : (
          <Sun size={18} color="#F59E0B" fill="#F59E0B" />
        )}
      </View>
      <CustomText
        variant="body-2-medium"
        className="text-gray-700 dark:text-gray-200"
      >
        {isDark ? "Dark Mode" : "Light Mode"}
      </CustomText>
    </TouchableOpacity>
  );
}
