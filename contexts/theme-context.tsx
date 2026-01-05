import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@coinpay_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setThemeState] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        const savedTheme = "light";
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeState(savedTheme);
          setColorScheme(savedTheme);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, [setColorScheme]);

  // Sync theme state with NativeWind colorScheme
  useEffect(() => {
    if (colorScheme && colorScheme !== theme) {
      setThemeState(colorScheme as Theme);
    }
  }, [colorScheme, theme]);

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      setColorScheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <View
        className="flex-1"
        style={!isLoaded ? { backgroundColor: "#ffffff" } : undefined}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
