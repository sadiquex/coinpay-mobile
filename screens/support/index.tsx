import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { HelpCircle, MessageCircle } from "lucide-react-native";

export default function SupportScreen() {
  return (
    <Container className="gap-4">
      <ScreenHeader goBackTo="/(main)" title="Support" />

      <View className="items-center justify-center" style={{ minHeight: 300 }}>
        <Image
          source={require("@/assets/images/support/support.svg")}
          contentFit="contain"
          style={{ width: "100%", height: 280, maxWidth: 400 }}
        />
      </View>

      <View className="items-center gap-2">
        <CustomText variant="h3-semibold">CoinPay Support</CustomText>
        <CustomText variant="body-1-regular">
          Our dedicated team is here to assist you with any questions or issues
          related to our Coinpay mobile app.
        </CustomText>
      </View>

      <View className="mt-8 gap-4">
        <CustomButton
          size="lg"
          onPress={() => {}}
          className="flex-row items-center"
          leftIcon={<MessageCircle size={20} color="#fff" fill="#fff" />}
        >
          Start a Chat
        </CustomButton>

        <CustomButton
          size="lg"
          variant="outline"
          onPress={() => {}}
          className="flex-row items-center"
          leftIcon={<HelpCircle size={20} color="#304FFF" />}
        >
          View FAQ
        </CustomButton>
      </View>
    </Container>
  );
}
