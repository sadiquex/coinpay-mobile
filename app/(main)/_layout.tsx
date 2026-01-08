import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/contexts/theme-context";
import { ChartPie, MessageCircleMore, User, QrCode } from "lucide-react-native";

export default function MainAppLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const activeBlue = "#304FFF";
  const iconSize = 24;

  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const createTabBarButton = (props: any) => {
    const { delayLongPress, disabled, ...restProps } = props;
    return (
      <TouchableOpacity
        {...restProps}
        delayLongPress={delayLongPress ?? undefined}
        disabled={disabled ?? undefined}
        onPress={(e) => {
          handleTabPress();
          props.onPress?.(e);
        }}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        // Active tab color - blue in both themes, slightly lighter in dark mode
        tabBarActiveTintColor: isDark ? "#5B6FFF" : activeBlue,
        // Inactive tab color - gray that adapts to theme
        tabBarInactiveTintColor: isDark ? "#ECEDEE" : "#687076",
        // Tab bar background color
        tabBarStyle: {
          backgroundColor: isDark ? "#2A2A2A" : "#FFFFFF",
          borderTopColor: isDark ? "#374151" : "#E5E7EB",
          borderTopWidth: 1,
          borderRadius: 20,
          marginHorizontal: 16,
          marginBottom: 28,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={iconSize}
              name="house.fill"
              color={focused ? activeBlue : color}
            />
          ),
          tabBarButton: createTabBarButton,
        }}
      />

      <Tabs.Screen
        name="spending"
        options={{
          title: "Spending",
          tabBarIcon: ({ color, focused }) => (
            <ChartPie
              size={iconSize}
              color={focused ? activeBlue : color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          tabBarButton: createTabBarButton,
        }}
      />

      <Tabs.Screen
        name="scan-to-pay"
        options={{
          title: "Scan to Pay",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.scanButton,
                {
                  backgroundColor: focused ? activeBlue : "transparent",
                },
              ]}
            >
              <QrCode
                size={iconSize}
                color={focused ? "#FFFFFF" : color}
                strokeWidth={2.5}
              />
            </View>
          ),
          tabBarButton: createTabBarButton,
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color, focused }) => (
            <MessageCircleMore
              size={iconSize}
              color={focused ? activeBlue : color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          tabBarButton: createTabBarButton,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User
              size={iconSize}
              color={focused ? activeBlue : color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          tabBarButton: createTabBarButton,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
