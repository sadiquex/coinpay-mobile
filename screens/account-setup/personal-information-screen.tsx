import { View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import AccountSetupTitleAndDescription from "./components/account-setup-title-and-description";
import { router } from "expo-router";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { CustomButton } from "@/components/ui/custom-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function Step3PersonalInformationScreen() {
  // full name, username, date of birth
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const insets = useSafeAreaInsets();

  const isFormValid =
    fullName.trim() && username.trim() && dateOfBirth !== null;

  const handleContinue = () => {
    router.push("/(account-setup)/step-4-country-of-residence");
    // if (isFormValid) {
    //   router.push("/(account-setup)/step-4-country-of-residence");
    // }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader />

        {/* Progress bar */}
        <ProgressBar totalSteps={4} currentStep={3} />

        <AccountSetupTitleAndDescription
          title="Add your personal info"
          description="This info needs to be accurate with your ID document."
        />

        <View className="gap-4">
          <CustomInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />

          <CustomInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />

          <CustomDatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onDateChange={setDateOfBirth}
            placeholder="Select your date of birth"
            maximumDate={new Date()} // Can't select future dates
            minimumDate={new Date(1900, 0, 1)} // Minimum date: Jan 1, 1900
          />
        </View>
      </Container>

      {/* Continue Button - Fixed at bottom */}
      <View
        className="bg-white px-4 dark:bg-[#121212]"
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}
      >
        <CustomButton
          size="lg"
          onPress={handleContinue}
          //   disabled={!isFormValid}
          className="w-full"
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
