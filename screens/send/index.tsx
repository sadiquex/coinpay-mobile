import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
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
    <TouchableOpacity className="flex-row items-center py-4">
      <Image
        source={{ uri: recipient.avatar }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold">{recipient.name}</Text>
        <Text className="text-sm text-gray-500">{recipient.email}</Text>
      </View>
      <Text className="text-base font-semibold text-red-500">
        {recipient.lastAmount}
      </Text>
    </TouchableOpacity>
  );
}

export default function SendScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <Container>
        <ScreenHeader title="Choose Recipient" goBackTo="/(main)" />

        <View className="mt-6">
          <Text className="text-sm text-gray-500 mb-4">
            Please select your recipient to send money.
          </Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-6">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search Recipient Email"
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base"
            />
          </View>

          {/* Most Recent Section */}
          <Text className="text-base font-semibold mb-4">Most Recent</Text>

          <View className="bg-white rounded-lg">
            {recipients.map((recipient, index) => (
              <View key={recipient.id}>
                <RecipientItem recipient={recipient} />
                {index < recipients.length - 1 && (
                  <View className="h-px bg-gray-100" />
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
        <TouchableOpacity className="bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg">
          <QrCode size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-sm font-medium mt-2 text-gray-700">
          Scan to Pay
        </Text>
      </View>
    </View>
  );
}
