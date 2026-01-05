import React from "react";
import { Container } from "@/components/ui/container";
import ScreenHeader from "@/components/ui/screen-header";
import { Image, Switch, TouchableOpacity, View } from "react-native";
import { CustomText } from "@/components/ui/custom-text";
import {
  Moon,
  User,
  ChevronRight,
  Landmark,
  FileText,
  SettingsIcon,
  ShieldCheck,
  HelpCircle,
  LogOut,
} from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { toggleTheme, setTheme } = useTheme();

  return (
    <Container>
      <ScreenHeader
        goBackTo="/(main)"
        title="My Profile"
        showBackButton={false}
      />

      <View className="mt-4 flex-1">
        {/* user profile section  */}
        <View className="items-center justify-center gap-2 rounded-lg bg-white p-4 dark:bg-gray-800">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            className="h-20 w-20 rounded-full"
          />

          <CustomText variant="label-1-semibold">Mehedi Hasan</CustomText>
          <CustomText variant="body-2-regular">hasan@gmail.com</CustomText>
          <CustomText variant="body-2-regular">+242446461</CustomText>
        </View>

        {/* settings section */}
        <View className="gap-6 rounded-lg bg-white p-4 dark:bg-gray-800">
          {/* dark mode toggle */}
          <View className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <Moon size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                {isDark ? "Dark Mode" : "Light Mode"}
              </CustomText>
            </View>

            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          {/* personal info */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <User size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Personal Info
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* banks and cards */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <Landmark size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Banks and Cards
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* transaction */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <FileText size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Transaction
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* settings */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <SettingsIcon size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Settings
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* data privacy */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <ShieldCheck size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Data Privacy
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* help and support */}
          <TouchableOpacity className="flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <HelpCircle size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Help and Support
              </CustomText>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* logout */}
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/(onboarding)")}
            className="flex-row items-center justify-between gap-2"
          >
            <View className="flex-row items-center gap-2">
              <View className="items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                <LogOut size={20} color="#6B7280" />
              </View>
              <CustomText variant="body-2-medium" className="dark:text-white">
                Logout
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
