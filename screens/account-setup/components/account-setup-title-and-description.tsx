import { View } from "react-native";
import React from "react";
import { CustomText } from "@/components/ui/custom-text";

export default function AccountSetupTitleAndDescription({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="gap-2">
      <CustomText
        variant="h3-semibold"
        className="text-[#121212] dark:text-white"
      >
        {title}
      </CustomText>
      <CustomText
        variant="body-1-regular"
        className="text-gray-500 dark:text-gray-300"
      >
        {description}
      </CustomText>
    </View>
  );
}
