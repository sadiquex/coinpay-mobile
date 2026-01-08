import { TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";

export default function SignInScreen() {
  return (
    <Container>
      <View className="gap-4">
        <ScreenHeader goBackTo="/(auth)/(signup)" />

        <CustomText variant="h3-semibold">Log in to your account</CustomText>
        <CustomText variant="body-1-regular">
          Enter your registered mobile number to log in
        </CustomText>

        <View className="gap-2">
          <CustomText>Phone</CustomText>
          <View className="flex-row gap-2">
            <TextInput
              placeholder="+1"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            />
            <TextInput
              placeholder="Mobile number"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </View>
        </View>

        <View className="gap-2">
          <CustomText>Password</CustomText>
          <View className="flex-row gap-2">
            <TextInput
              placeholder="**********"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </View>

          <TouchableOpacity>
            <CustomText variant="body-2-medium" className="text-primary-blue">
              Forgot password?
            </CustomText>
          </TouchableOpacity>
        </View>

        <CustomButton
          size="lg"
          onPress={() => {
            router.push("/(main)");
          }}
        >
          Log in
        </CustomButton>
      </View>
    </Container>
  );
}
