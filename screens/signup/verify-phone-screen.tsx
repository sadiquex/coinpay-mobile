import { TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router, useLocalSearchParams } from "expo-router";

export default function VerifyPhoneScreen() {
  const params = useLocalSearchParams<{ phoneNumber?: string }>();
  const phoneNumber = params.phoneNumber || "+1 (555) 123-4567";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    // Handle paste - if value length > 1, it's likely a paste
    if (value.length > 1) {
      handlePaste(value);
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace - move to previous input if current is empty
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    // Handle pasted code
    const digits = text.replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    digits.split("").forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus the last filled input or the first empty one
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const handleVerify = () => {
    if (isCodeComplete) {
      // TODO: Add verification logic
      // const verificationCode = code.join("");
      router.push("/(auth)/(signup)/create-account");
    }
  };

  const handleResend = () => {
    // TODO: Add resend logic
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader goBackTo="/(auth)/(signup)/enter-phone-number" />

        <View className="gap-2">
          <CustomText
            variant="h3-semibold"
            className="text-[#121212] dark:text-white"
          >
            Confirm your phone
          </CustomText>
          <CustomText
            variant="body-1-regular"
            className="text-[#121212] dark:text-gray-300"
          >
            We send 6 digits code to {phoneNumber}
          </CustomText>
        </View>

        {/* OTP Input Fields */}
        <View className="items-center gap-4 py-4">
          <View className="flex-row justify-center gap-3">
            {code.map((digit, index) => (
              <View key={index} className="items-center gap-2">
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleCodeChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  placeholder=""
                  className="h-14 w-12 rounded-lg border border-gray-200 bg-white text-center text-2xl font-semibold text-[#121212] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
                <View
                  className={`h-0.5 w-12 ${
                    digit ? "bg-[#304FFF]" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Resend Link */}
        <View className="flex-row items-center justify-center">
          <CustomText
            variant="body-1-regular"
            className="text-gray-600 dark:text-gray-400"
          >
            Didn&apos;t get a code?{" "}
          </CustomText>
          <TouchableOpacity onPress={handleResend}>
            <CustomText
              variant="body-1-regular"
              className="text-[#304FFF] underline"
            >
              Resend
            </CustomText>
          </TouchableOpacity>
        </View>
      </Container>

      {/* Verify Button */}
      <View className="px-4 pb-6">
        <CustomButton
          size="lg"
          onPress={handleVerify}
          disabled={!isCodeComplete}
          className="w-full"
        >
          Verify Your Number
        </CustomButton>
      </View>
    </View>
  );
}
