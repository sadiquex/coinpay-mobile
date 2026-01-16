import { View, Image } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomModal } from "@/components/ui/custom-modal";
import { router } from "expo-router";
import { Mail, Check } from "lucide-react-native";

export default function CreateAccountScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isFormValid =
    phoneNumber.trim().length >= 10 && password.trim().length >= 6;

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const digits = phone.replace(/\D/g, "");

    // Format as: +233 XX XXX XX XX (Ghana format)
    if (digits.length >= 9) {
      const countryCode = "+233";
      const rest = digits.slice(-9);
      return `${countryCode} ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5, 7)} ${rest.slice(7, 9)}`;
    }

    // Fallback: just add +233 prefix
    return `+233 ${phone}`;
  };

  const displayPhoneNumber = formatPhoneNumber(phoneNumber);

  const handleCreateAccount = () => {
    if (isFormValid) {
      setShowModal(true);
    }
  };

  const handleYes = () => {
    setShowModal(false);
    router.push({
      pathname: "/(auth)/(signup)/verify-phone",
      params: { phoneNumber: displayPhoneNumber },
    });
  };

  const handleNo = () => {
    setShowModal(false);
    // User can edit their phone number
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6 dark:bg-gray-900">
        {/* <ScreenHeader goBackTo="/(auth)/(signup)/verify-phone" /> */}
        <ScreenHeader />

        <View className="gap-2">
          <CustomText
            variant="h3-semibold"
            className="text-[#121212] dark:text-white"
          >
            Create your account
          </CustomText>
          <CustomText
            variant="body-1-regular"
            className="text-[#121212] dark:text-gray-300"
          >
            Choose a username and password to complete your account setup
          </CustomText>
        </View>

        {/* Username Input */}
        <View className="gap-2">
          <CustomText
            variant="label-1-medium"
            className="text-gray-400 dark:text-gray-300"
          >
            Phone Number
          </CustomText>

          <View className="flex-row items-center gap-2 bg-white dark:bg-gray-900">
            <View className="border-input flex-row items-center gap-2 rounded-md border border-gray-200 px-4 py-3">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9BaHk5vZ4AbdNPway6lqGZMX4j7_uApH1Q&s"
                }
                alt="Ghana flag"
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
              <CustomText variant="body-1-medium">+233</CustomText>
            </View>

            <CustomInput
              // label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              showLabel={false}
              containerClassName="flex-1"
            />
          </View>

          {phoneNumber.length > 0 && phoneNumber.length < 10 && (
            <CustomText variant="body-3-regular" className="text-red-500">
              Phone number must be at least 10 characters
            </CustomText>
          )}
        </View>

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          error={password.length > 0 && password.length < 6}
          errorMessage="Password must be at least 6 characters"
        />
      </Container>

      {/* Create Account Button */}
      <View className="px-4 pb-6">
        <CustomButton
          size="lg"
          onPress={handleCreateAccount}
          disabled={!isFormValid}
          className="w-full"
        >
          Create Account
        </CustomButton>
      </View>

      {/* Verification Modal */}
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Verify your phone number before we send code."
        subtitle={`Is this correct? ${displayPhoneNumber}`}
        primaryButton={{
          label: "Yes",
          onPress: handleYes,
        }}
        secondaryButton={{
          label: "No",
          onPress: handleNo,
        }}
        containerClassName="gap-6"
      >
        {/* Illustration: Envelope with checkmark */}
        <View className="relative h-32 w-32 items-center justify-center">
          {/* Circle background */}
          <View className="absolute h-32 w-32 rounded-full bg-[#304FFF]/10" />

          {/* Envelope icon */}
          <View className="relative">
            <Mail size={48} color="#304FFF" strokeWidth={1.5} />

            <View className="absolute -right-1 -top-1">
              <View className="rounded-full bg-[#304FFF] p-1">
                <Check size={12} color="white" strokeWidth={4} />
              </View>
            </View>
          </View>

          {/* Decorative dots */}
          <View className="absolute -left-2 top-4 h-2 w-2 rounded-full bg-[#304FFF]/30" />
          <View className="absolute -right-2 bottom-6 h-2 w-2 rounded-full bg-[#304FFF]/30" />
          <View className="absolute -top-2 left-6 h-1.5 w-1.5 rounded-full bg-[#304FFF]/40" />
          <View className="absolute right-8 top-8 h-1 w-1 rounded-full bg-[#304FFF]/50" />
        </View>
      </CustomModal>
    </View>
  );
}
