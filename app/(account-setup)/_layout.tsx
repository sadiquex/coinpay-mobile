import { Stack } from "expo-router";
import React from "react";

export default function AccountSetupLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step-2-home-address"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step-3-personal-information"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step-4-country-of-residence"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
