import { CustomText } from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import {
  Bell,
  ChevronDown,
  Landmark,
  ScanBarcode,
  Search,
  Send,
  Trophy,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BalanceSection() {
  const { theme } = useTheme();

  return (
    <View className="relative min-h-[400px] gap-4 rounded-lg bg-primary-blue p-4">
      <SafeAreaView className="flex-1 gap-12">
        {/* trophy,search bar and notificatoins button */}
        <View className="flex-row items-center justify-between gap-4">
          <TouchableOpacity className="flex items-center">
            <Trophy size={20} color="white" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center gap-2 rounded-full border border-white bg-white/20 p-2">
            {/* search icon */}
            <Search size={20} color="white" />
            <TextInput
              // transparent white background
              placeholder="Search 'Payments'"
              className="flex-1 bg-transparent text-white"
              placeholderTextColor="white"
            />
          </View>

          <TouchableOpacity
            className="flex items-center"
            onPress={() => router.push("/(notifications)")}
          >
            <Bell size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* centered balances */}
        <View className="items-center justify-center gap-4">
          <View className="items-center justify-center gap-4">
            <View className="flex-row items-center gap-2">
              <View className="h-6 w-6 overflow-hidden rounded-full bg-white">
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
                  }}
                  style={{ width: 24, height: 24, resizeMode: "cover" }}
                />
              </View>

              <CustomText variant="body-2-medium" className="text-white">
                US Dollar
              </CustomText>
              <ChevronDown size={12} color="white" />
            </View>
            <CustomText variant="h1-semibold" className="font-bold text-white">
              $22,000.00
            </CustomText>

            {/* available balance */}
            <CustomText variant="body-2-medium" className="text-white">
              Available Balance
            </CustomText>

            {/* rounded button to add money */}
            <TouchableOpacity className="flex-row items-center gap-2 rounded-full border border-white p-4">
              <Wallet size={20} color="white" />
              <CustomText variant="body-2-semibold" className="text-white">
                Add Money
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* send, request, bank buttons */}
      <View className="absolute -bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center gap-12 rounded-lg bg-white px-8 py-4 dark:bg-[#2A2A2A]">
        <TouchableOpacity
          className="flex items-center gap-2"
          onPress={() => router.push("/(send)")}
        >
          {/* light mode (black colour) and dark mode (blueish colour) */}
          <Send color={theme === "dark" ? "#2F4CF3" : "#000000"} />
          <CustomText variant="body-2-medium">Send</CustomText>
        </TouchableOpacity>

        {/* vertical separator */}
        <View className="h-[80%] w-px bg-gray-200" />

        <TouchableOpacity className="flex items-center gap-2">
          {/* light mode (black colour) and dark mode (yellowish colour) */}
          <ScanBarcode color={theme === "dark" ? "#FBBF24" : "#000000"} />
          <CustomText variant="body-2-medium">Scan</CustomText>
        </TouchableOpacity>

        {/* vertical separator */}
        <View className="h-[80%] w-px bg-gray-200" />

        <TouchableOpacity className="flex items-center gap-2">
          <Landmark color={theme === "dark" ? "#FBBF24" : "#000000"} />
          <CustomText variant="body-2-medium">Bank</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
