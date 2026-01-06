import { TextInput, View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";

export default function EnterPhoneNumberScreen() {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      // Format phone number for display
      const formattedPhone = `+1 ${phoneNumber.trim()}`;
      router.push({
        pathname: "/(auth)/(signup)/verify-phone",
        params: { phoneNumber: formattedPhone },
      });
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader goBackTo="/(auth)/(signup)" />

        <View className="gap-2">
          <CustomText
            variant="h3-semibold"
            className="text-[#121212] dark:text-white"
          >
            Enter your phone number
          </CustomText>
          <CustomText
            variant="body-1-regular"
            className="text-[#121212] dark:text-gray-300"
          >
            We&apos;ll send you a verification code to confirm your phone number
          </CustomText>
        </View>

        {/* Phone Number Input */}
        <View className="gap-2">
          <CustomText
            variant="label-1-medium"
            className="text-[#121212] dark:text-gray-300"
          >
            Phone Number
          </CustomText>
          <View className="flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <CustomText
              variant="body-1-medium"
              className="text-[#121212] dark:text-white"
            >
              +1
            </CustomText>
            <View className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="(555) 123-4567"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#9CA3AF"}
              className="flex-1 text-base text-[#121212] dark:text-white"
              keyboardType="phone-pad"
              autoFocus
            />
          </View>
        </View>
      </Container>

      {/* Continue Button */}
      <View className="px-4 pb-6">
        <CustomButton
          size="lg"
          onPress={handleContinue}
          disabled={!phoneNumber.trim()}
          className="w-full"
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
