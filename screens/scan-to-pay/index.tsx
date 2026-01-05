import { CustomText } from "@/components/ui/custom-text";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { ChevronLeft, Flashlight, RotateCcw } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FRAME_SIZE = SCREEN_WIDTH * 0.75; // 75% of screen width
const FRAME_TOP = SCREEN_HEIGHT * 0.25; // Position frame at 25% from top

export default function ScanToPayScreen() {
  const insets = useSafeAreaInsets();
  const [permission] = useCameraPermissions();
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate scanning line
    if (!scanned) {
      const animateScanLine = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scanLineAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scanLineAnim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      animateScanLine();
    }
  }, [scanLineAnim, scanned]);

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_SIZE],
  });

  const handleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // TODO: Process the scanned QR code data
      console.log("Scanned QR Code:", data);
    }
  };

  const handleCapture = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleRetake = () => {
    setScanned(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(main)");
  };

  // Permission loading state
  if (permission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0A7EA4]">
        <CustomText variant="body-1-medium" className="text-white">
          Requesting camera permission...
        </CustomText>
      </View>
    );
  }

  // Permission denied state
  if (!permission?.granted) {
    return (
      <View className="flex-1 bg-[#0A7EA4]">
        <View
          className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-4"
          style={{ paddingTop: insets.top + 8 }}
        >
          <TouchableOpacity onPress={handleBack}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <CustomText
            variant="h4-semibold"
            className="flex-1 text-center text-white"
          >
            Scan to Pay
          </CustomText>
          <View className="w-6" />
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <CustomText
            variant="h3-semibold"
            className="mb-4 text-center text-white"
          >
            Camera Permission Required
          </CustomText>
          <CustomText
            variant="body-1-regular"
            className="mb-6 text-center text-white/80"
          >
            We need access to your camera to scan QR codes for payments.
          </CustomText>
          <TouchableOpacity
            onPress={handleBack}
            className="rounded-full bg-white px-8 py-4"
            activeOpacity={0.8}
          >
            <CustomText variant="body-1-medium" className="text-[#0A7EA4]">
              Go Back
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A7EA4]">
      {/* Header */}
      <View
        className="absolute left-0 right-0 top-0 z-30 flex-row items-center justify-between px-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <CustomText
          variant="h4-semibold"
          className="flex-1 text-center text-white"
        >
          Scan to Pay
        </CustomText>
        <View className="w-6" />
      </View>

      {/* Camera View */}
      <View className="flex-1">
        <CameraView
          facing="back"
          className="h-full w-full flex-1"
          enableTorch={flashlightOn}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1 }}
        />
      </View>

      {/* Blue Transparent Overlay with Cutout */}
      {/* Top overlay */}
      <View
        // "#304FFF"
        className="absolute left-0 right-0 bg-[#304FFF]/60"
        style={{
          top: 0,
          height: FRAME_TOP,
          zIndex: 10,
        }}
      />

      {/* Left overlay (middle section) */}
      <View
        // "#304FFF"
        className="absolute bg-[#304FFF]/60"
        style={{
          top: FRAME_TOP,
          left: 0,
          width: (SCREEN_WIDTH - FRAME_SIZE) / 2,
          height: FRAME_SIZE,
          zIndex: 10,
        }}
      />

      {/* Right overlay (middle section) */}
      <View
        // "#304FFF"
        className="absolute bg-[#304FFF]/60"
        style={{
          top: FRAME_TOP,
          right: 0,
          width: (SCREEN_WIDTH - FRAME_SIZE) / 2,
          height: FRAME_SIZE,
          zIndex: 10,
        }}
      />

      {/* Bottom overlay */}
      <View
        // "#304FFF"
        className="absolute left-0 right-0 bg-[#304FFF]/60"
        style={{
          top: FRAME_TOP + FRAME_SIZE,
          bottom: 0,
          zIndex: 10,
        }}
      />

      {/* Scanning Frame - White Dashed Border */}
      <View
        className="absolute"
        style={{
          top: FRAME_TOP,
          left: (SCREEN_WIDTH - FRAME_SIZE) / 2,
          width: FRAME_SIZE,
          height: FRAME_SIZE,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <View
          className="relative rounded-[20px] border-2 border-dashed border-white"
          style={{
            width: FRAME_SIZE,
            height: FRAME_SIZE,
          }}
        >
          {/* Corner indicators */}
          <View
            className="absolute h-[30px] w-[30px] rounded-tl-[20px] border-[3px] border-white"
            style={{
              top: -2,
              left: -2,
              borderRightWidth: 0,
              borderBottomWidth: 0,
            }}
          />
          <View
            className="absolute h-[30px] w-[30px] rounded-tr-[20px] border-[3px] border-white"
            style={{
              top: -2,
              right: -2,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
            }}
          />
          <View
            className="absolute h-[30px] w-[30px] rounded-bl-[20px] border-[3px] border-white"
            style={{
              bottom: -2,
              left: -2,
              borderRightWidth: 0,
              borderTopWidth: 0,
            }}
          />
          <View
            className="absolute h-[30px] w-[30px] rounded-br-[20px] border-[3px] border-white"
            style={{
              bottom: -2,
              right: -2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
            }}
          />

          {/* Animated scanning line */}
          <Animated.View
            // "#304FFF"
            className="absolute left-0 right-0 h-0.5 w-full bg-[#304FFF]/80"
            style={{
              transform: [{ translateY: scanLineTranslateY }],
            }}
          />
        </View>
      </View>

      {/* Instructions */}
      <View
        className="absolute left-0 right-0 items-center px-5"
        style={{
          top: FRAME_TOP + FRAME_SIZE + 40,
          zIndex: 20,
        }}
      >
        <CustomText
          variant="h4-semibold"
          className="mb-2 text-center text-white"
        >
          Scan a QR to Pay
        </CustomText>
        <CustomText
          variant="body-2-regular"
          className="text-center text-white/80"
        >
          Hold the code inside the frame, it will be scanned automatically
        </CustomText>
      </View>

      {/* Bottom Action Bar */}
      <View
        className="absolute left-0 right-0 flex-row items-center justify-around px-10"
        style={{
          bottom: Math.max(insets.bottom, 20),
          zIndex: 20,
        }}
      >
        {/* Flashlight Button */}
        <TouchableOpacity
          onPress={handleFlashlight}
          className="h-12 w-12 items-center justify-center rounded-full bg-white/20"
          activeOpacity={0.7}
        >
          <Flashlight
            size={24}
            color="white"
            fill={flashlightOn ? "white" : "none"}
          />
        </TouchableOpacity>

        {/* Capture Button */}
        <TouchableOpacity
          onPress={handleCapture}
          className="h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
          activeOpacity={0.8}
        >
          <View className="h-14 w-14 rounded-full bg-white" />
        </TouchableOpacity>

        {/* Re-take Button */}
        <TouchableOpacity
          onPress={handleRetake}
          className="h-12 w-12 items-center justify-center rounded-full bg-white/20"
          activeOpacity={0.7}
        >
          <RotateCcw size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
