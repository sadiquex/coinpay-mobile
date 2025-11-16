import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4 pt-2">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
