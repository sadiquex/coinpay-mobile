import { Stack } from "expo-router";
import React from "react";

export default function SendLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="select-purpose"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="enter-amount"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="choose-payment-account"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payment-success"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
