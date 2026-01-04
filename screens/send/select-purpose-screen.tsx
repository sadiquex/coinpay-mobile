import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { Briefcase, Receipt, User2 } from "lucide-react-native";
import { CustomButton } from "@/components/ui/custom-button";
import { router } from "expo-router";

interface PurposeItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

const purposes: PurposeItem[] = [
  {
    id: "1",
    title: "Personal",
    description: "Pay your friends and family",
    icon: <User2 size={24} color="#2F4CF3" />,
    bgColor: "#E6F3FF",
  },
  {
    id: "2",
    title: "Business",
    description: "Pay your employees and vendors",
    // orangeish icon
    icon: <Briefcase size={24} color="#F59E0B" />,
    bgColor: "#FFF3E6",
  },
  {
    id: "3",
    title: "Other",
    description: "For other purposes",
    // yellowish icon
    icon: <Receipt size={24} color="#FBBF24" />,
    bgColor: "#FEFCE8",
  },
];

export default function SelectPurposeScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Container className="gap-4">
        <ScreenHeader goBackTo="/(send)" />

        <CustomText variant="h3-semibold">Select a Purpose</CustomText>
        <CustomText variant="body-1-regular">
          Select a Method for Sending Money
        </CustomText>

        {purposes.map((purpose) => (
          <SelectPurposeItem
            key={purpose.id}
            purpose={purpose}
            isSelected={selectedId === purpose.id}
            onSelect={() => setSelectedId(purpose.id)}
          />
        ))}
      </Container>

      <View className="px-4">
        <CustomButton
          className="mb-6"
          disabled={!selectedId}
          onPress={() => router.push("/enter-amount")}
        >
          Continue
        </CustomButton>
      </View>
    </View>
  );
}

interface SelectPurposeItemProps {
  purpose: PurposeItem;
  isSelected: boolean;
  onSelect: () => void;
}

const SelectPurposeItem = ({
  purpose,
  isSelected,
  onSelect,
}: SelectPurposeItemProps) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`flex flex-row items-center justify-between rounded-lg border-b-2 p-4 ${
        isSelected ? "border-blue-500" : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* left ( icon and details) */}
      <View className="flex flex-row items-center gap-3">
        <View
          className={`h-12 w-12 items-center justify-center rounded-full`}
          style={{ backgroundColor: purpose.bgColor }}
        >
          {purpose.icon}
        </View>
        <View>
          <CustomText variant="body-2-semibold">{purpose.title}</CustomText>
          <CustomText variant="body-2-regular">
            {purpose.description}
          </CustomText>
        </View>
      </View>

      {/* right (radio button) */}
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
