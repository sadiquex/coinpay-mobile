import React from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { View } from "react-native";
import SpendingsChart from "./spendings-chart";
import { ChevronDown } from "lucide-react-native";
import SpendingTransactions from "./spending-transactions";
import { useTheme } from "@/contexts/theme-context";

export default function SpendingScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Container className="gap-4">
      <ScreenHeader goBackTo="/(main)" title="Spending" />

      <View className="flex w-1/3 flex-row items-center justify-between rounded-lg bg-[#EAEBFF] p-4 dark:bg-gray-800">
        <CustomText variant="label-1-medium" className="dark:text-white">
          January
        </CustomText>
        <ChevronDown size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
      </View>

      {/* 2 cards */}
      <View className="flex-row gap-4">
        <View className="flex-1 flex-col gap-2 rounded-xl bg-blue-500 p-4">
          <CustomText className="text-white">Total Spend</CustomText>

          <CustomText variant="h3-semibold" className="text-white">
            $1,000.00
          </CustomText>
        </View>

        <View className="flex-1 flex-col gap-2 rounded-xl bg-yellow-500 p-4">
          <CustomText className="text-black">Available Balance</CustomText>

          <CustomText variant="h3-semibold" className="text-black">
            $5,000.00
          </CustomText>
        </View>
      </View>

      {/* transactions chart */}

      <SpendingsChart />

      <SpendingTransactions />
    </Container>
  );
}
