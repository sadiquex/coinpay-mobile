import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-[#F7F7F7] dark:bg-gray-900"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className={twMerge("px-4 pt-2", className)}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
