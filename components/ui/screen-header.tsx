import * as Haptics from "expo-haptics";
import { Href, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ScreenHeader({
  title,
  goBackTo,
}: {
  title: string;
  goBackTo: Href;
}) {
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
      <TouchableOpacity onPress={handleBack}>
        <ChevronLeft size={24} color="black" />
      </TouchableOpacity>
      {/* centered title */}
      <Text className="text-2xl font-semibold text-center flex-1">{title}</Text>
    </View>
  );
}
