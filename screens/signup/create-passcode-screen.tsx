import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { X } from "lucide-react-native";

export default function CreatePasscodeScreen() {
  const { theme } = useTheme();
  const [passcode, setPasscode] = useState("");

  const handleNumberPress = (number: string) => {
    if (passcode.length < 4) {
      setPasscode(passcode + number);
    }
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
  };

  // Auto-navigate when passcode is complete
  React.useEffect(() => {
    if (passcode.length === 4) {
      // TODO: Save passcode
      // Navigate to enable notifications screen
      router.push("/(auth)/(signup)/enable-notifications");
    }
  }, [passcode]);

  const keypadNumbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", ""],
  ];

  const keypadLetters: Record<string, string> = {
    "2": "ABC",
    "3": "DEF",
    "4": "GHI",
    "5": "JKL",
    "6": "MNO",
    "7": "PQRS",
    "8": "TUV",
    "9": "WXYZ",
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <View className="flex-1 px-4">
        {/* Header with Progress Bar */}
        <View className="gap-4 pt-2">
          <ScreenHeader goBackTo="/(auth)/(signup)/create-account" />

          {/* Progress Bar */}
          <View className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <View className="h-full bg-[#304FFF]" style={{ width: "75%" }} />
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center gap-6">
          {/* Title and Subtitle */}
          <View className="items-center gap-2">
            <CustomText
              variant="h3-semibold"
              className="text-center text-[#121212] dark:text-white"
            >
              Create passcode
            </CustomText>
            <CustomText
              variant="body-1-regular"
              className="text-center text-gray-600 dark:text-gray-400"
            >
              This info needs to be accurate with your ID document.
            </CustomText>
          </View>

          {/* Passcode Dots */}
          <View className="flex-row gap-4">
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                className={`h-4 w-4 rounded-full ${
                  index < passcode.length
                    ? "bg-[#121212] dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Numeric Keypad */}
        <View className="pb-8">
          {keypadNumbers.map((row, rowIndex) => (
            <View key={rowIndex} className="mb-2 flex-row justify-center gap-2">
              {row.map((number, colIndex) => {
                if (rowIndex === 3 && colIndex === 0) {
                  // Empty space on bottom left
                  return <View key="empty-left" className="h-16 w-24" />;
                }
                if (rowIndex === 3 && colIndex === 2) {
                  // Delete button on bottom right
                  return (
                    <TouchableOpacity
                      key="delete"
                      onPress={handleDelete}
                      disabled={passcode.length === 0}
                      className="h-16 w-24 items-center justify-center rounded-lg bg-gray-100 active:bg-gray-200 dark:bg-gray-800 dark:active:bg-gray-700"
                    >
                      <X
                        size={24}
                        color={
                          passcode.length === 0
                            ? theme === "dark"
                              ? "#4B5563"
                              : "#D1D5DB"
                            : theme === "dark"
                              ? "#ECEDEE"
                              : "#121212"
                        }
                      />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={number}
                    onPress={() => handleNumberPress(number)}
                    disabled={passcode.length >= 4}
                    className="h-16 w-24 items-center justify-center rounded-lg bg-gray-100 active:bg-gray-200 dark:bg-gray-800 dark:active:bg-gray-700"
                  >
                    <CustomText
                      variant="h2-semibold"
                      className={`${
                        passcode.length >= 4
                          ? "text-gray-400 dark:text-gray-600"
                          : "text-[#121212] dark:text-white"
                      }`}
                    >
                      {number}
                    </CustomText>
                    {keypadLetters[number] && (
                      <CustomText
                        variant="caption-regular"
                        className={`mt-0.5 ${
                          passcode.length >= 4
                            ? "text-gray-400 dark:text-gray-600"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {keypadLetters[number]}
                      </CustomText>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
