import "react-native-reanimated";

import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { CustomToast } from "@/components/ui/custom-toast";
import "../global.css";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(send)" options={{ headerShown: false }} />
        <Stack.Screen name="(account-setup)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Toast
        config={{
          success: (props) => (
            <CustomToast
              type="success"
              text1={props.text1}
              text2={props.text2}
            />
          ),
          error: (props) => (
            <CustomToast type="error" text1={props.text1} text2={props.text2} />
          ),
        }}
      />
    </NavigationThemeProvider>
  );
}
