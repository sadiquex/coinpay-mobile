import { View } from "react-native";
import React from "react";
import { CustomText } from "@/components/ui/custom-text";

interface BarData {
  label: string;
  height: number; // Height percentage (0-100)
  color: string;
}

const CHART_DATA: BarData[] = [
  { label: "2-8", height: 85, color: "#304FFF" }, // Blue - tall
  { label: "9-15", height: 50, color: "#FCD34D" }, // Yellow - shorter
  { label: "16-22", height: 85, color: "#304FFF" }, // Blue - tall
  { label: "23-29", height: 50, color: "#FCD34D" }, // Yellow - shorter
  { label: "30-1", height: 65, color: "#304FFF" }, // Blue - medium
];

const MAX_BAR_HEIGHT = 120; // Maximum height in pixels

export default function SpendingsChart() {
  return (
    <View className="rounded-lg border-b border-blue-500 bg-white p-4 dark:bg-gray-800">
      <CustomText variant="label-1-medium" className="mb-4 dark:text-white">
        Transactions
      </CustomText>

      {/* Chart Container */}
      <View className="flex-row items-end justify-between">
        {CHART_DATA.map((bar, index) => (
          <View key={index} className="items-center" style={{ flex: 1 }}>
            {/* Value Label Above Bar - Vertical Text */}
            <View
              className="mb-1"
              style={{
                height: 40,
                width: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomText
                variant="caption-medium"
                className="text-gray-600 dark:text-gray-400"
                style={{
                  transform: [{ rotate: "-90deg" }],
                  width: 40,
                  textAlign: "center",
                }}
              >
                $100
              </CustomText>
            </View>

            {/* Bar */}
            <View
              className="w-full rounded-t-lg"
              style={{
                height: (bar.height / 100) * MAX_BAR_HEIGHT,
                backgroundColor: bar.color,
                minHeight: 20,
              }}
            />

            {/* X-axis Label */}
            <View className="mt-2">
              <CustomText
                variant="caption-medium"
                className="text-gray-600 dark:text-gray-400"
              >
                {bar.label}
              </CustomText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
