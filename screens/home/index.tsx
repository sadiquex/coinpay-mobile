import React from "react";
import { ScrollView, View } from "react-native";
import BalanceSection from "./components/balance-section";
import HomeTransactions from "./components/home-transactions";

export default function HomeScreen() {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="dark:bg-dark-mode-bg gap-4 bg-[#F7F7F7]"
      >
        <BalanceSection />

        <HomeTransactions />

        <View className="h-10 w-full bg-transparent" />
      </ScrollView>
    </>
  );
}
