import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import React from "react";
import { Text, View } from "react-native";

export default function ScanToPayScreen() {
  return (
    <Container>
      <ScreenHeader title="Scan to Pay" goBackTo="/(main)" />
      <View className="mt-4">
        <Text className="text-lg">Scan to Pay Screen</Text>
      </View>
    </Container>
  );
}
