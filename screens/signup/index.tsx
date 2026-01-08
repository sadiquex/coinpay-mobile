import { Image, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";

export default function SignUpScreen() {
  const handleSignUp = () => {
    router.push("/(auth)/(signup)/enter-phone-number");
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-white dark:bg-[#121212]"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-1 items-center justify-center gap-8">
          {/* Illustration */}
          <View className="mb-4 h-64 w-full items-center justify-center">
            <Image
              source={require("@/assets/images/onboarding/trusted-by-millions-light-mode.png")}
              className="h-[200px] w-[180px] object-contain"
              resizeMode="contain"
            />
          </View>

          {/* Title and Subtitle */}
          <View className="w-full items-center gap-4">
            <CustomText
              variant="h3-semibold"
              className="text-center text-[#121212] dark:text-white"
            >
              Create your {"\n"} Coinpay account
            </CustomText>
            <CustomText
              variant="body-1-regular"
              className="text-center text-[#121212] dark:text-gray-300"
            >
              Coinpay is a powerful tool that allows you to easily send,
              receive, and track all your transactions.
            </CustomText>
          </View>

          {/* Buttons */}
          <View className="w-full gap-4">
            <CustomButton size="lg" onPress={handleSignUp} className="w-full">
              Sign up
            </CustomButton>

            <CustomButton
              size="lg"
              onPress={() => router.push("/(auth)/(signin)")}
              variant="secondary"
              className="w-full"
            >
              Log in
            </CustomButton>
          </View>
        </View>

        {/* Legal Text */}
        <View className="pb-8">
          <CustomText
            variant="body-1-regular"
            className="text-center text-gray-600 dark:text-gray-400"
          >
            By continuing you accept our{" "}
            <CustomText
              variant="body-1-regular"
              className="text-[#304FFF] underline"
            >
              Terms of Service
            </CustomText>{" "}
            and{" "}
            <CustomText
              variant="body-1-regular"
              className="text-[#304FFF] underline"
            >
              Privacy Policy
            </CustomText>
          </CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
