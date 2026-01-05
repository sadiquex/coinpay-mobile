import * as Haptics from "expo-haptics";
import { Href, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/theme-context";

export default function ScreenHeader({
  title = "",
  goBackTo,
  showBackButton = true,
}: {
  title?: string;
  goBackTo: Href;
  showBackButton?: boolean;
}) {
  const { theme } = useTheme();
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (goBackTo) {
      router.push(goBackTo);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between">
      {showBackButton && (
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft size={24} color={theme === "dark" ? "white" : "black"} />
        </TouchableOpacity>
      )}
      {/* centered title */}
      {title && (
        <Text className="flex-1 text-center text-2xl font-semibold dark:text-white">
          {title}
        </Text>
      )}
    </View>
  );
}
