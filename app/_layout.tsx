import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { CustomToast } from "@/components/ui/custom-toast";
import "../global.css";
// import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(main)",
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(send)" options={{ headerShown: false }} />
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
