import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { View } from "react-native";
import { CustomInput } from "@/components/ui/custom-input";
import { router } from "expo-router";
import { CustomButton } from "@/components/ui/custom-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AccountSetupTitleAndDescription from "./components/account-setup-title-and-description";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function EnterEmailScreen() {
  const [email, setEmail] = useState("");
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    router.push("/(account-setup)/step-2-home-address");
    // if (email.trim()) {
    //   router.push("/(account-setup)/step-2-home-address");
    // }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader />

        {/* Progress bar */}
        <ProgressBar totalSteps={4} currentStep={1} />

        <AccountSetupTitleAndDescription
          title="Add your Email"
          description="We'll send you a verification code to confirm your email"
        />

        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="name@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoFocus
        />
      </Container>

      {/* Continue Button - Fixed at bottom */}
      <View
        className="bg-white px-4 dark:bg-[#121212]"
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}
      >
        <CustomButton
          size="lg"
          onPress={handleContinue}
          // disabled={!email.trim()}
          className="w-full"
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
