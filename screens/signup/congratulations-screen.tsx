import { View, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";

export default function CongratulationsScreen() {
  const handleContinue = () => {
    router.replace("/(main)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="pt-2">
            <ScreenHeader goBackTo="/(auth)/(signup)/enable-notifications" />
          </View>

          {/* Main Content */}
          <View className="flex-1 items-center justify-center gap-8">
            {/* Illustration */}

            <Image
              source={require("@/assets/images/onboarding/receive-money-light-mode.png")}
              className="h-64 w-full object-contain"
              resizeMode="contain"
            />

            {/* Title and Subtitle */}
            <View className="items-center gap-4 px-4">
              <CustomText
                variant="h3-semibold"
                className="text-center text-[#121212] dark:text-white"
              >
                Congratulations!{"\n"}Welcome to Coinpay
              </CustomText>
              <CustomText
                variant="body-1-regular"
                className="text-center text-gray-600 dark:text-gray-400"
              >
                We are happy to have you. It&apos;s time to send, receive and
                track your expense.
              </CustomText>
            </View>
          </View>

          {/* Continue Button */}
          <View className="pb-8">
            <CustomButton size="lg" onPress={handleContinue} className="w-full">
              Continue
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
