import { ThemeToggle } from "@/components/ui/theme-toggle";
import React from "react";
import { ScrollView, View } from "react-native";
import BalanceSection from "./components/balance-section";
import HomeTransactions from "./components/home-transactions";

export default function HomeScreen() {
  return (
    <>
      <ScrollView className="gap-4 bg-[#F7F7F7] dark:bg-gray-900">
        <BalanceSection />

        <View className="mt-6 px-4">
          <ThemeToggle />
        </View>

        <HomeTransactions />
      </ScrollView>
    </>
  );
}
