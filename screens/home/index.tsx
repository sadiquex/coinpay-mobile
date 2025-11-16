import React from "react";
import { ScrollView } from "react-native";
import BalanceSection from "./components/balance-section";
import HomeTransactions from "./components/home-transactions";

export default function HomeScreen() {
  return (
    <>
      <ScrollView className="gap-4">
        <BalanceSection />

        <HomeTransactions />
      </ScrollView>
    </>
  );
}
