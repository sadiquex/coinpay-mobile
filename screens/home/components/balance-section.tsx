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
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BalanceSection() {
  return (
    <View className="bg-[#2F4CF3] relative p-4 rounded-lg min-h-[400px] gap-4">
      <SafeAreaView className="flex-1 gap-12">
        {/* trophy,search bar and notificatoins button */}
        <View className="flex-row items-center justify-between gap-4">
          <TouchableOpacity className="flex items-center">
            <Trophy size={20} color="white" />
          </TouchableOpacity>

          <View className="flex-1 rounded-full p-2 flex-row items-center gap-2 border border-white bg-white/20">
            {/* search icon */}
            <Search size={20} color="white" />
            <TextInput
              // transparent white background
              placeholder="Search"
              className="flex-1 text-white bg-transparent"
              placeholderTextColor="white"
            />
          </View>

          <TouchableOpacity className="flex items-center">
            <Bell size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* centered balances */}
        <View className="items-center justify-center gap-4">
          <View className="items-center justify-center gap-4">
            <View className="flex-row items-center gap-2">
              <View className="w-6 h-6 rounded-full overflow-hidden bg-white">
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
                  }}
                  style={{ width: 24, height: 24, resizeMode: "cover" }}
                />
              </View>

              <Text className="text-white text-sm">US Dollar</Text>
              <ChevronDown size={12} color="white" />
            </View>
            <Text className="text-white text-4xl font-semibold">
              ${Number(22000).toLocaleString()}
            </Text>

            {/* available balance */}
            <Text className="text-white text-sm">Available Balance</Text>

            {/* rounded button to add money */}
            <TouchableOpacity className="rounded-full p-4 flex-row items-center gap-2 border border-white">
              <Wallet size={20} color="white" />
              <Text className="text-white">Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* send, request, bank buttons */}
      <View className="absolute z-50 -bottom-8 left-1/2 -translate-x-1/2 flex flex-row items-center gap-12 bg-white rounded-lg py-4 px-8">
        <TouchableOpacity className="flex items-center">
          <Send />
          <Text className="text-lg">Send</Text>
        </TouchableOpacity>

        {/* vertical separator */}
        <View className="h-[80%] w-px bg-gray-200" />

        <TouchableOpacity className="flex items-center">
          <ScanBarcode />
          <Text className="text-lg">Scan</Text>
        </TouchableOpacity>

        {/* vertical separator */}
        <View className="h-[80%] w-px bg-gray-200" />

        <TouchableOpacity className="flex items-center">
          <Landmark />
          <Text className="text-lg">Bank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
