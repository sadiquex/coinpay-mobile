import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";

export default function MainAppLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarLabel: "",
        // active tab colour is blue
        tabBarActiveTintColor: "#304FFF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan-to-pay"
        options={{
          title: "Scan to Pay",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
