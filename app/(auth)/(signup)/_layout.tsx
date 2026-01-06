import React from "react";
import { Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="enter-phone-number"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-phone"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-account"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-passcode"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="enable-notifications"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="congratulations"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
