import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";

export default function EnableNotificationsScreen() {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEnableNotifications = async () => {
    try {
      setIsRequesting(true);

      // Request notification permissions
      // Note: Install expo-notifications package for full functionality
      // For now, we'll just navigate to main app
      // TODO: Add expo-notifications package and implement:
      // const { status } = await Notifications.requestPermissionsAsync();

      // Simulate a brief delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to congratulations screen
      router.push("/(auth)/(signup)/congratulations");
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      // Navigate anyway
      router.push("/(auth)/(signup)/congratulations");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/(signup)/congratulations");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <View className="flex-1 px-4">
        {/* Header with Progress Bar */}
        <View className="gap-4 pt-2">
          <ScreenHeader goBackTo="/(auth)/(signup)/create-passcode" />

          {/* Progress Bar - 100% complete */}
          <View className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <View className="h-full bg-[#304FFF]" style={{ width: "100%" }} />
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center gap-8">
          {/* Illustration/Icon */}
          <View className="items-center justify-center rounded-full bg-[#304FFF]/10 p-8 dark:bg-[#304FFF]/20">
            <Bell size={50} color="#304FFF" strokeWidth={1.5} />
          </View>

          {/* Title and Subtitle */}
          <View className="items-center gap-4 px-4">
            <CustomText
              variant="h3-semibold"
              className="text-center text-[#121212] dark:text-white"
            >
              Enable Notifications
            </CustomText>
            <CustomText
              variant="body-1-regular"
              className="text-center text-gray-600 dark:text-gray-400"
            >
              Stay updated with important account activity, payment
              notifications, and security alerts.
            </CustomText>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-4 pb-8">
          <CustomButton
            size="lg"
            onPress={handleEnableNotifications}
            loading={isRequesting}
            disabled={isRequesting}
            className="w-full"
          >
            Enable Notifications
          </CustomButton>

          <CustomButton
            size="lg"
            variant="secondary"
            onPress={handleSkip}
            disabled={isRequesting}
            className="w-full"
          >
            Skip for Now
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
