import { CustomButton } from "@/components/ui/custom-button";
import { CustomText } from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  illustration: React.ReactNode;
}

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onboardingSlides: OnboardingSlide[] = useMemo(
    () => [
      {
        id: "1",
        title: "Trusted by millions of people, part of one part",
        illustration: (
          <Image
            source={
              theme === "dark"
                ? require("@/assets/images/onboarding/trust-by-millions-dark-mode.png")
                : require("@/assets/images/onboarding/trusted-by-millions-light-mode.png")
            }
            className="h-[200px] w-[180px] object-contain"
            resizeMode="contain"
          />
        ),
      },
      {
        id: "2",
        title: "Spend money abroad, and track your expense",
        illustration: (
          <Image
            source={
              theme === "dark"
                ? require("@/assets/images/onboarding/spend-money-abroad-dark-mode.png")
                : require("@/assets/images/onboarding/spend-money-abroad-light-mode.png")
            }
            className="h-[200px] w-[180px] object-contain"
            resizeMode="contain"
          />
        ),
      },
      {
        id: "3",
        title: "Receive Money From Anywhere In The World",
        illustration: (
          <Image
            source={
              theme === "dark"
                ? require("@/assets/images/onboarding/receive-money-dark-mode.png")
                : require("@/assets/images/onboarding/receive-money-light-mode.png")
            }
            className="h-[200px] w-[180px] object-contain"
            resizeMode="contain"
          />
        ),
      },
    ],
    [theme]
  );

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // Navigate to main app or login screen
      // router.replace("/(main)");
      router.replace("/(auth)/(signup)");
    }
  };

  const handleScroll = (event: any) => {
    const slideSize = SCREEN_WIDTH;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index >= 0 && index < onboardingSlides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <View className="flex-1">
        {/* Onboarding Slides */}
        <FlatList
          ref={flatListRef}
          data={onboardingSlides}
          renderItem={({ item }) => (
            <View
              style={{ width: SCREEN_WIDTH }}
              className="flex-1 items-center justify-center px-8"
            >
              {/* Illustration */}
              <View className="mb-12 h-64 w-full items-center justify-center">
                {item.illustration}
              </View>

              {/* Title */}
              <CustomText
                variant="h3-semibold"
                className="text-center text-[#121212] dark:text-white"
              >
                {item.title}
              </CustomText>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            if (index >= 0 && index < onboardingSlides.length) {
              setCurrentIndex(index);
            }
          }}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />

        {/* Bottom Section */}
        <View className="px-8 pb-8">
          {/* Dots Indicator */}
          <View className="mb-8 flex-row items-center justify-center gap-2">
            {onboardingSlides.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  index === currentIndex
                    ? "w-8 bg-[#304FFF]"
                    : "w-2 bg-gray-400 dark:bg-[#ECEDEE]"
                }`}
              />
            ))}
          </View>

          {/* Next Button */}
          <CustomButton
            variant="primary"
            size="lg"
            onPress={handleNext}
            className="w-full"
          >
            {currentIndex === onboardingSlides.length - 1
              ? "Get Started"
              : "Next"}
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
