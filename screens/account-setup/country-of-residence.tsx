import { View, Image } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { ProgressBar } from "@/components/ui/progress-bar";
import AccountSetupTitleAndDescription from "./components/account-setup-title-and-description";
import { CustomDropdown, DropdownItem } from "@/components/ui/custom-dropdown";
import { CustomButton } from "@/components/ui/custom-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

// List of countries with flag emojis/icons
const countries: DropdownItem[] = [
  {
    value: "gh",
    label: "Ghana",
    icon: (
      <Image
        source={{ uri: "https://flagcdn.com/w20/gh.png" }}
        className="h-5 w-7"
        resizeMode="contain"
      />
    ),
  },
  {
    value: "ng",
    label: "Nigeria",
    icon: (
      <Image
        source={{ uri: "https://flagcdn.com/w20/ng.png" }}
        className="h-5 w-7"
        resizeMode="contain"
      />
    ),
  },
  {
    value: "ke",
    label: "Kenya",
    icon: (
      <Image
        source={{ uri: "https://flagcdn.com/w20/ke.png" }}
        className="h-5 w-7"
        resizeMode="contain"
      />
    ),
  },
  {
    value: "za",
    label: "South Africa",
    icon: (
      <Image
        source={{ uri: "https://flagcdn.com/w20/za.png" }}
        className="h-5 w-7"
        resizeMode="contain"
      />
    ),
  },
  {
    value: "tg",
    label: "Togo",
    icon: (
      <Image
        source={{ uri: "https://flagcdn.com/w20/tg.png" }}
        className="h-5 w-7"
        resizeMode="contain"
      />
    ),
  },
];

export default function CountryOfResidenceScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    if (selectedCountry) {
      // TODO: Navigate to next screen or complete setup
      console.log("Selected country:", selectedCountry);

      // homepage
      router.push("/(main)");
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader />

        <ProgressBar totalSteps={4} currentStep={4} />

        <AccountSetupTitleAndDescription
          title="Country of Residence"
          description="We'll use this information to verify your identity"
        />

        <CustomDropdown
          label="Country"
          items={countries}
          value={selectedCountry}
          onSelect={(item) => setSelectedCountry(item.value)}
          placeholder="Select your country"
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
          // disabled={!selectedCountry}
          className="w-full"
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
