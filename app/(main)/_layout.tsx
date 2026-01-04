import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/contexts/theme-context";

export default function MainAppLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        // Active tab color - blue in both themes, slightly lighter in dark mode
        tabBarActiveTintColor: isDark ? "#5B6FFF" : "#304FFF",
        // Inactive tab color - gray that adapts to theme
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#687076",
        // Tab bar background color
        tabBarStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderTopColor: isDark ? "#374151" : "#E5E7EB",
          borderTopWidth: 1,
        },
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
