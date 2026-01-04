import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";

export default function EnterAmountScreen() {
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Container className="gap-4">
        <ScreenHeader goBackTo="/(send)" />

        <CustomText variant="h3-semibold">Enter Amount</CustomText>
        <CustomText variant="body-1-regular">
          Enter the amount you want to send
        </CustomText>

        {/* contact card */}
        <View className="items-center gap-4 rounded-lg bg-white p-4 dark:bg-gray-800">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            className="h-20 w-20 rounded-full"
          />

          <View className="items-center">
            <CustomText variant="label-1-semibold">Mehedi Hasan</CustomText>
            <CustomText className="text-gray-500 dark:text-gray-400">
              hasan@gmail.com
            </CustomText>
          </View>

          <View className="items-center gap-2">
            {/* Currency selector */}
            <TouchableOpacity className="flex-row items-center gap-2">
              <CustomText
                variant="body-2-medium"
                className="text-gray-500 dark:text-gray-400"
              >
                US Dollar
              </CustomText>
              <ChevronDown
                size={16}
                color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
              />
            </TouchableOpacity>

            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter Amount"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#9CA3AF"}
              className="w-1/2 rounded-lg border-b border-gray-200 p-2 text-center text-2xl dark:border-gray-700 dark:text-white"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>
      </Container>

      <View className="px-4">
        <CustomButton
          className="mb-6"
          onPress={() => router.push("/(send)/choose-payment-account")}
          // disabled={!amount}
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}
