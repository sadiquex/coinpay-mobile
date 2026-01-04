import { Image, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { CreditCard } from "lucide-react-native";
import { router } from "expo-router";

interface PaymentAccount {
  id: string;
  type: "card" | "bank";
  lastFour: string;
  name: string;
}

const accounts: PaymentAccount[] = [
  {
    id: "1",
    type: "card",
    lastFour: "3994",
    name: "Account",
  },
  {
    id: "2",
    type: "card",
    lastFour: "5678",
    name: "Account",
  },
];

interface AccountItemProps {
  account: PaymentAccount;
  isSelected: boolean;
  onSelect: () => void;
}

const AccountItem = ({ account, isSelected, onSelect }: AccountItemProps) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <CreditCard size={20} color="#2F4CF3" />
        </View>
        <View>
          <CustomText variant="body-2-medium">
            {account.name} ************{account.lastFour}
          </CustomText>
        </View>
      </View>
      <RadioButton isSelected={isSelected} />
    </TouchableOpacity>
  );
};

interface RadioButtonProps {
  isSelected: boolean;
}

const RadioButton = ({ isSelected }: RadioButtonProps) => {
  return (
    <View
      className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
        isSelected
          ? "border-blue-500 bg-blue-500"
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      {isSelected && <View className="h-3 w-3 rounded-full bg-white" />}
    </View>
  );
};

export default function ChoosePaymentAccountScreen() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    accounts[0]?.id || null
  );
  const amount = 500; // This would come from navigation params or state

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Container className="gap-4">
        <ScreenHeader goBackTo="/(send)/enter-amount" />

        <CustomText variant="h3-semibold">Select a Payment Account</CustomText>
        <CustomText variant="body-1-regular">
          Select a Method for Sending Money
        </CustomText>

        {/* Recipient Card */}
        <View className="items-center gap-4 rounded-lg bg-white p-4 dark:bg-gray-800">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            className="h-20 w-20 rounded-full"
          />

          <View className="items-center">
            <CustomText variant="label-1-semibold">Mehedi Hasan</CustomText>
            <CustomText variant="body-2-regular" className="text-gray-500">
              helloyouthmind@gmail.com
            </CustomText>
          </View>
        </View>

        {/* Choose Account Section */}
        <View className="gap-3">
          <CustomText variant="body-2-medium">Choose Account</CustomText>

          {accounts.map((account) => (
            <AccountItem
              key={account.id}
              account={account}
              isSelected={selectedAccountId === account.id}
              onSelect={() => setSelectedAccountId(account.id)}
            />
          ))}
        </View>
      </Container>

      {/* Pay Button */}
      <View className="px-4">
        <CustomButton
          className="mb-6"
          onPress={() => {
            // Handle payment
            router.push("/(send)/payment-success");
          }}
          disabled={!selectedAccountId}
        >
          Pay ${amount}
        </CustomButton>
      </View>
    </View>
  );
}
