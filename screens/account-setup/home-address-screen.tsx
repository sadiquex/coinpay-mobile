import { View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { router } from "expo-router";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import AccountSetupTitleAndDescription from "./components/account-setup-title-and-description";
import { ProgressBar } from "@/components/ui/progress-bar";
export default function Step2HomeAddressScreen() {
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const isFormValid = addressLine.trim() && city.trim() && postcode.trim();

  const handleContinue = () => {
    router.push("/(account-setup)/step-3-personal-information");
    // if (isFormValid) {
    //   router.push("/(account-setup)/step-3-personal-information");
    // }
  };

  //   address line, city and postcode

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader />

        {/* Progress bar */}
        <ProgressBar totalSteps={4} currentStep={2} />

        <AccountSetupTitleAndDescription
          title="Home address"
          description="We'll use this address to send you your card and other important documents."
        />

        <View className="gap-4">
          <CustomInput
            label="Address Line"
            value={addressLine}
            onChangeText={setAddressLine}
            placeholder="House number, street name, etc."
          />

          <CustomInput
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="City or state"
          />

          <CustomInput
            label="Postcode"
            value={postcode}
            onChangeText={setPostcode}
            placeholder="Eg: GW-0828-4738"
          />
        </View>
      </Container>

      <View className="px-4 pb-6">
        <CustomButton
          onPress={handleContinue} // disabled={!isFormValid}
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
