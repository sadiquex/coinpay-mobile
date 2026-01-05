import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { router } from "expo-router";
import { QrCode, Search } from "lucide-react-native";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastAmount: string;
}

const recipients: Recipient[] = [
  {
    id: "1",
    name: "Mehedi Hasan",
    email: "helloyouthmind@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastAmount: "-$100",
  },
  {
    id: "2",
    name: "Mehedi Hasan",
    email: "helloyouthmind@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastAmount: "-$100",
  },
  {
    id: "3",
    name: "Mehedi Hasan",
    email: "helloyouthmind@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastAmount: "-$100",
  },
  {
    id: "4",
    name: "Mehedi Hasan",
    email: "helloyouthmind@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastAmount: "-$100",
  },
  {
    id: "5",
    name: "Mehedi Hasan",
    email: "helloyouthmind@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastAmount: "-$100",
  },
];

function RecipientItem({ recipient }: { recipient: Recipient }) {
  return (
    <TouchableOpacity
      className="flex-row items-center p-4"
      onPress={() => router.push("/(send)/select-purpose")}
    >
      <Image
        source={{ uri: recipient.avatar }}
        className="h-12 w-12 rounded-full"
      />
      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold dark:text-white">
          {recipient.name}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-500">
          {recipient.email}
        </Text>
      </View>
      <Text className="text-base font-semibold text-red-500 dark:text-red-500">
        {recipient.lastAmount}
      </Text>
    </TouchableOpacity>
  );
}

export default function ChooseRecipientScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <Container>
        <ScreenHeader title="Choose Recipient" goBackTo="/(main)" />

        <View className="mt-6">
          <Text className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Please select your recipient to send money.
          </Text>

          {/* Search Bar */}
          <View className="mb-6 flex-row items-center rounded-lg bg-gray-100 px-4 py-3">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search Recipient Email"
              placeholderTextColor="#9CA3AF"
              className="ml-3 flex-1 text-base"
            />
          </View>

          {/* Most Recent Section */}
          <Text className="mb-4 text-base font-semibold dark:text-white">
            Most Recent
          </Text>

          <View className="rounded-lg bg-white dark:bg-gray-800">
            {recipients.map((recipient, index) => (
              <View key={recipient.id}>
                <RecipientItem recipient={recipient} />
                {index < recipients.length - 1 && (
                  <View className="h-px bg-gray-100 dark:bg-gray-700" />
                )}
              </View>
            ))}
          </View>
        </View>
      </Container>

      {/* Floating Action Button */}
      <View
        className="absolute left-0 right-0 items-center"
        style={{ bottom: Math.max(insets.bottom, 32) }}
      >
        <TouchableOpacity className="h-16 w-16 items-center justify-center rounded-full bg-blue-500">
          <QrCode size={28} color="white" />
        </TouchableOpacity>
        <Text className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Scan to Pay
        </Text>
      </View>
    </View>
  );
}
