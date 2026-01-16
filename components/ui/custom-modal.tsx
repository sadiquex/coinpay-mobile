import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";
import { CustomText } from "./custom-text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CustomModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Callback when modal should be closed
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal subtitle or description
   */
  subtitle?: string;
  /**
   * Content to display in the modal (illustration, text, etc.)
   */
  children?: React.ReactNode;
  /**
   * Primary action button
   */
  primaryButton?: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
  };
  /**
   * Secondary action button
   */
  secondaryButton?: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
  };
  /**
   * Whether to show the close button (X icon)
   */
  showCloseButton?: boolean;
  /**
   * Custom container className
   */
  containerClassName?: string;
  /**
   * Custom modal content className
   */
  contentClassName?: string;
  /**
   * Whether clicking backdrop closes the modal
   */
  dismissible?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  primaryButton,
  secondaryButton,
  showCloseButton = true,
  containerClassName,
  contentClassName,
  dismissible = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(modalTranslateY, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.spring(modalScale, {
          toValue: 1,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalScale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity, modalTranslateY, modalScale]);

  const handleBackdropPress = () => {
    if (dismissible) {
      onClose();
    }
  };

  const backdropStyle = {
    opacity: backdropOpacity,
  };

  const modalStyle = {
    transform: [{ translateY: modalTranslateY }, { scale: modalScale }],
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1">
        {/* Backdrop */}
        <Pressable
          className="absolute inset-0 bg-black/50"
          onPress={handleBackdropPress}
        >
          <Animated.View className="flex-1" style={backdropStyle} />
        </Pressable>

        {/* Modal Content */}
        <View className="flex-1 items-center justify-center px-4">
          <Animated.View
            style={modalStyle}
            className={twMerge(
              "w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl",
              "dark:bg-gray-800",
              contentClassName
            )}
          >
            {/* Close Button */}
            {showCloseButton && (
              <View className="absolute right-4 top-4 z-10">
                <TouchableOpacity
                  onPress={onClose}
                  className="h-8 w-8 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:active:bg-gray-600"
                  activeOpacity={0.7}
                >
                  <X size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
                </TouchableOpacity>
              </View>
            )}

            {/* Content */}
            <View className={twMerge("gap-4", containerClassName)}>
              {/* Illustration/Children */}
              {children && (
                <View className="items-center justify-center">{children}</View>
              )}

              {/* Title */}
              {title && (
                <CustomText
                  variant="h3-semibold"
                  className="text-center text-[#121212] dark:text-white"
                >
                  {title}
                </CustomText>
              )}

              {/* Subtitle */}
              {subtitle && (
                <CustomText
                  variant="body-1-regular"
                  className="text-center text-gray-600 dark:text-gray-300"
                >
                  {subtitle}
                </CustomText>
              )}

              {/* Buttons */}
              {(primaryButton || secondaryButton) && (
                <View className="mt-2 gap-3">
                  {primaryButton && (
                    <TouchableOpacity
                      onPress={primaryButton.onPress}
                      className={twMerge(
                        "rounded-full bg-[#304FFF] px-6 py-4 active:bg-[#304FFF]/80",
                        primaryButton.variant === "outline" &&
                          "border-2 border-[#304FFF] bg-transparent active:bg-[#304FFF]/10"
                      )}
                      activeOpacity={0.8}
                    >
                      <CustomText
                        variant="body-1-medium"
                        className={twMerge(
                          "text-center text-white",
                          primaryButton.variant === "outline" &&
                            "text-[#304FFF]"
                        )}
                      >
                        {primaryButton.label}
                      </CustomText>
                    </TouchableOpacity>
                  )}

                  {secondaryButton && (
                    <TouchableOpacity
                      onPress={secondaryButton.onPress}
                      className={twMerge(
                        "rounded-full border-2 border-[#304FFF] bg-transparent px-6 py-4 active:bg-[#304FFF]/10",
                        secondaryButton.variant === "primary" &&
                          "border-0 bg-[#304FFF] active:bg-[#304FFF]/80"
                      )}
                      activeOpacity={0.8}
                    >
                      <CustomText
                        variant="body-1-medium"
                        className={twMerge(
                          "text-center text-[#304FFF]",
                          secondaryButton.variant === "primary" && "text-white"
                        )}
                      >
                        {secondaryButton.label}
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};
