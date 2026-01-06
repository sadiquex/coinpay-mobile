import { TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { CustomText } from "@/components/ui/custom-text";
import { CustomButton } from "@/components/ui/custom-button";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";

export default function CreateAccountScreen() {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid =
    username.trim().length >= 3 && password.trim().length >= 6;

  const handleCreateAccount = () => {
    if (isFormValid) {
      // TODO: Add account creation logic
      router.push("/(auth)/(signup)/create-passcode");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      <Container className="gap-6">
        <ScreenHeader goBackTo="/(auth)/(signup)/verify-phone" />

        <View className="gap-2">
          <CustomText
            variant="h3-semibold"
            className="text-[#121212] dark:text-white"
          >
            Create your account
          </CustomText>
          <CustomText
            variant="body-1-regular"
            className="text-[#121212] dark:text-gray-300"
          >
            Choose a username and password to complete your account setup
          </CustomText>
        </View>

        {/* Username Input */}
        <View className="gap-2">
          <CustomText
            variant="label-1-medium"
            className="text-[#121212] dark:text-gray-300"
          >
            Username
          </CustomText>
          <View className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#9CA3AF"}
              className="text-base text-[#121212] dark:text-white"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
          </View>
          {username.length > 0 && username.length < 3 && (
            <CustomText variant="body-3-regular" className="text-red-500">
              Username must be at least 3 characters
            </CustomText>
          )}
        </View>

        {/* Password Input */}
        <View className="gap-2">
          <CustomText
            variant="label-1-medium"
            className="text-[#121212] dark:text-gray-300"
          >
            Password
          </CustomText>
          <View className="flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#9CA3AF"}
              className="flex-1 text-base text-[#121212] dark:text-white"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff
                  size={20}
                  color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                />
              ) : (
                <Eye
                  size={20}
                  color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length > 0 && password.length < 6 && (
            <CustomText variant="body-3-regular" className="text-red-500">
              Password must be at least 6 characters
            </CustomText>
          )}
        </View>
      </Container>

      {/* Create Account Button */}
      <View className="px-4 pb-6">
        <CustomButton
          size="lg"
          onPress={handleCreateAccount}
          disabled={!isFormValid}
          className="w-full"
        >
          Create Account
        </CustomButton>
      </View>
    </View>
  );
}
