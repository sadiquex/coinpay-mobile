import { CheckCircle2, XCircle } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { CustomText } from "./custom-text";

interface CustomToastProps {
  text1?: string;
  text2?: string;
  type?: "success" | "error";
}

export const CustomToast = ({
  text1,
  text2,
  type = "success",
}: CustomToastProps) => {
  const isSuccess = type === "success";

  // Success colors - matching the design with light green background (#E6F7E6) and dark green text/icon
  const bgColor = isSuccess
    ? "bg-[#E6F7E6] dark:bg-green-900/20"
    : "bg-red-50 dark:bg-red-900/20";
  const iconBgColor = isSuccess ? "bg-green-600" : "bg-red-600";
  const textColor = isSuccess
    ? "text-green-700 dark:text-green-400"
    : "text-red-700 dark:text-red-400";

  return (
    <View
      className={`mx-4 flex-row items-center gap-3 rounded-xl px-4 py-3 ${bgColor}`}
    >
      {/* Circular icon with checkmark/X */}
      <View
        className={`h-6 w-6 items-center justify-center rounded-full ${iconBgColor}`}
      >
        {/* <Icon size={16} color="#FFFFFF" fill="#FFFFFF" /> */}

        {/* use check and x icon from lucide react native */}
        {isSuccess ? (
          <CheckCircle2 size={16} color="#FFFFFF" />
        ) : (
          <XCircle size={16} color="#FFFFFF" />
        )}
      </View>

      {/* Text content */}
      <View className="flex-1">
        {text1 && (
          <CustomText variant="body-2-medium" className={textColor}>
            {text1}
          </CustomText>
        )}
        {text2 && (
          <CustomText
            variant="body-3-regular"
            className={`${textColor} opacity-80`}
          >
            {text2}
          </CustomText>
        )}
      </View>
    </View>
  );
};
