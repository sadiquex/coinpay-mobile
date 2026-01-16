import React, { useMemo, useRef, useState } from "react";
import {
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { BottomSheetScrollView, BottomSheetModal } from "@gorhom/bottom-sheet";
import { twMerge } from "tailwind-merge";
import { ChevronDown, Check } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";
import { CustomText } from "./custom-text";
import { BottomModal } from "./bottom-modal";

export interface DropdownItem {
  /**
   * Unique identifier for the item
   */
  value: string;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * Optional icon (e.g., flag) to display on the left
   */
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  /**
   * Label text to display above the dropdown
   */
  label?: string;
  /**
   * Array of items to display in the dropdown
   */
  items: DropdownItem[];
  /**
   * Selected value
   */
  value?: string | null;
  /**
   * Callback when an item is selected
   */
  onSelect?: (item: DropdownItem) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Error state - applies error styling
   */
  error?: boolean;
  /**
   * Error message to display below the dropdown
   */
  errorMessage?: string;
  /**
   * Helper text to display below the dropdown
   */
  helperText?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Whether to show the label
   */
  showLabel?: boolean;
  /**
   * Custom container className
   */
  containerClassName?: string;
  /**
   * Snap points for the bottom sheet (default: ['50%', '75%', '80%', '100%'])
   */
  snapPoints?: string[];
  /**
   * Whether the dropdown is searchable
   */
  searchable?: boolean;
  /**
   * Placeholder for search input
   */
  searchPlaceholder?: string;
  /**
   * Message to show when no results found
   */
  emptyMessage?: string;
  /**
   * Left icon to display inside the dropdown input
   */
  leftIcon?: React.ReactNode;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  items,
  value,
  onSelect,
  placeholder = "Select an option",
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  showLabel = true,
  containerClassName,
  snapPoints = ["50%", "75%", "80%", "100%"],
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage,
  leftIcon,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [internalValue, setInternalValue] = useState<string | null>(
    value || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const searchInputRef = useRef<TextInput>(null);

  // Sync external value with internal value
  React.useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  // Find selected item
  const selectedItem = items.find((item) => item.value === internalValue);
  const hasValue = !!selectedItem;

  // Memoized filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const itemLabel = item.label?.toLowerCase() || "";
      const itemValue = item.value?.toString().toLowerCase() || "";
      return itemLabel.includes(query) || itemValue.includes(query);
    });
  }, [items, searchQuery, searchable]);

  const handleOpenModal = () => {
    if (disabled) {
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(true);
    setSearchQuery(""); // Reset search when opening
    bottomSheetModalRef.current?.present();

    // Focus search input after modal animation
    if (searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const onPressOption = (item: DropdownItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInternalValue(item.value);
    onSelect?.(item);
    setSearchQuery(""); // Reset search when closing
    setIsOpen(false);
    bottomSheetModalRef.current?.dismiss();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSearchQuery(""); // Reset search when closing
  };

  // Container styles for input
  const inputContainerClasses = twMerge(
    // Base styles
    Platform.OS === "android" ? "h-[60px]" : "h-[58px]",
    "flex-row gap-3 rounded-lg border px-3 py-2",
    // Border color based on state
    isOpen
      ? "border-[#304FFF]"
      : error
        ? "border-red-500 dark:border-red-500"
        : "border-gray-200 dark:border-gray-700",
    // Background
    "bg-white/60 dark:bg-gray-800",
    // Disabled state
    disabled && "opacity-50"
  );

  return (
    <>
      <View className={twMerge("gap-1", containerClassName)}>
        {showLabel && label && (
          <CustomText
            variant="label-1-medium"
            className={twMerge(
              "text-gray-400 dark:text-gray-300",
              error && "text-red-500 dark:text-red-400"
            )}
          >
            {label}
          </CustomText>
        )}

        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.5}
          onPress={handleOpenModal}
          disabled={disabled}
          className={inputContainerClasses}
        >
          {/* Left Icon (Flag) */}
          {hasValue && selectedItem.icon ? (
            <View className="justify-center" pointerEvents="none">
              {selectedItem.icon}
            </View>
          ) : leftIcon ? (
            <View className="justify-center" pointerEvents="none">
              {leftIcon}
            </View>
          ) : null}

          {/* Selected Value Display */}
          <View className="flex-1 justify-center" pointerEvents="none">
            <CustomText
              variant="body-1-regular"
              className={twMerge(
                "text-base",
                hasValue
                  ? "text-[#121212] dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              )}
            >
              {hasValue ? selectedItem.label : placeholder}
            </CustomText>
          </View>

          {/* Chevron Icon */}
          <View className="justify-center" pointerEvents="none">
            <ChevronDown size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
          </View>
        </TouchableOpacity>

        {/* Error/Helper Text */}
        {(errorMessage || helperText) && (
          <>
            {error && errorMessage ? (
              <CustomText
                variant="body-3-regular"
                className="text-red-500 dark:text-red-400"
              >
                {errorMessage}
              </CustomText>
            ) : (
              helperText && (
                <CustomText
                  variant="body-3-regular"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {helperText}
                </CustomText>
              )
            )}
          </>
        )}
      </View>

      {/* Bottom Modal */}
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={snapPoints.length - 1} // Open at last snap point (100%)
        onClose={handleCloseModal}
      >
        <View className="mb-4 w-full flex-1 p-4">
          <CustomText
            variant="h4-semibold"
            className="mb-1 text-[#121212] dark:text-white"
          >
            {label}
          </CustomText>
          <CustomText
            variant="body-2-medium"
            className="mb-2 text-gray-500 dark:text-gray-400"
          >
            Select an option
          </CustomText>

          {/* Search Input */}
          {searchable && (
            <View className="mb-3">
              <TextInput
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor="#98A2B3"
                className="h-10 rounded-lg border border-gray-200 px-3 text-base text-[#121212] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>
          )}

          <BottomSheetScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              maxHeight: 660,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => {
                const isSelected = item.value === internalValue;
                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => onPressOption(item)}
                    activeOpacity={0.7}
                    className={twMerge(
                      "flex-row items-center gap-3 p-4",
                      isSelected && "bg-primary-blue/10 dark:bg-primary-blue/20"
                    )}
                  >
                    {/* Item Icon (Flag) */}
                    {item.icon && (
                      <View className="flex-shrink-0">{item.icon}</View>
                    )}

                    {/* Item Label */}
                    <CustomText
                      variant="body-1-regular"
                      className={twMerge(
                        "flex-1",
                        isSelected
                          ? "font-medium text-primary-blue"
                          : "text-[#121212] dark:text-white"
                      )}
                    >
                      {item.label}
                    </CustomText>

                    {/* Checkmark for selected item */}
                    {isSelected && (
                      <View className="flex-shrink-0">
                        <Check size={20} color="#304FFF" strokeWidth={3} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View className="items-center py-10">
                <CustomText
                  variant="body-2-regular"
                  className="text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage || "No results found"}
                </CustomText>
              </View>
            )}
          </BottomSheetScrollView>
        </View>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
  },
});
