import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { CheckCircle2, Copy, CreditCard } from "lucide-react-native";
import { router } from "expo-router";
import { copyToClipboard } from "@/utils";

export default function PaymentSuccessScreen() {
  // These would typically come from navigation params or state
  const transactionData = {
    recipient: {
      name: "Mehedi Hasan",
      email: "helloyouthmind@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    transactionId: "JD890KQ",
    date: "01 Jan 2023 at 5:00 pm",
    account: {
      lastFour: "3994",
    },
  };

  const handleBackToHome = () => {
    router.push("/(main)");
  };

  const handleMakeAnotherPayment = () => {
    router.push("/(send)");
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Container className="gap-4">
        <ScreenHeader goBackTo="/(main)" />

        {/* Success Banner */}
        <View className="flex-row items-center gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <CheckCircle2 size={24} color="#10B981" />
          <View className="flex-1">
            <CustomText
              variant="body-2-medium"
              className="text-green-700 dark:text-green-400"
            >
              Transaction Complete! - {transactionData.date}
            </CustomText>
          </View>
        </View>

        {/* Recipient Card */}
        <View className="items-center gap-4 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Image
            source={{
              uri: transactionData.recipient.avatar,
            }}
            className="h-20 w-20 rounded-full"
          />

          <View className="items-center gap-1">
            <CustomText variant="label-1-semibold">
              {transactionData.recipient.name}
            </CustomText>
            <CustomText
              variant="body-2-regular"
              className="text-gray-500 dark:text-gray-400"
            >
              {transactionData.recipient.email}
            </CustomText>
          </View>

          <TouchableOpacity className="flex-row items-center gap-2">
            <CustomText
              variant="body-2-medium"
              className="flex-row items-center gap-2 text-blue-500 dark:text-blue-400"
            >
              Coinpay Transaction ID: {transactionData.transactionId}
            </CustomText>
            <TouchableOpacity
              onPress={() => copyToClipboard(transactionData.transactionId)}
            >
              <Copy size={16} color="#2F4CF3" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View className="gap-3">
          <CustomText variant="body-2-medium">Account</CustomText>
          <View className="flex-row items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <CreditCard size={20} color="#2F4CF3" />
            </View>
            <CustomText variant="body-2-medium">
              Account ************{transactionData.account.lastFour}
            </CustomText>
          </View>
        </View>
      </Container>

      {/* Action Buttons */}
      <View className="gap-3 px-4 pb-6">
        <CustomButton onPress={handleBackToHome}>Back to Homepage</CustomButton>
        <CustomButton variant="secondary" onPress={handleMakeAnotherPayment}>
          Make another Payment
        </CustomButton>

        {/* Footer Disclaimer */}
        <View className="mt-4 px-2">
          <Text className="text-center text-xs text-gray-500 dark:text-gray-400">
            Thank you for using our app to send money. If you have any questions
            or concerns, please don&apos;t hesitate to{" "}
            <Text className="text-blue-500 dark:text-blue-400">
              contact us.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
