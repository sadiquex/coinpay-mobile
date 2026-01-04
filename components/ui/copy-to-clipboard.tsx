import React, { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Copy, Check } from "lucide-react-native";
import { copyToClipboard } from "@/utils";
import { CustomText } from "./custom-text";

interface CopyToClipboardProps extends Omit<TouchableOpacityProps, "onPress"> {
  text: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  variant?: "default" | "minimal";
  onCopy?: () => void;
}

export function CopyToClipboard({
  text,
  children,
  showIcon = true,
  variant = "default",
  onCopy,
  className,
  ...props
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text, true, true);

    if (success) {
      setCopied(true);
      onCopy?.();

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (variant === "minimal") {
    return (
      <TouchableOpacity
        onPress={handleCopy}
        className={className}
        disabled={copied}
        {...props}
      >
        {showIcon && (
          <View className="items-center justify-center">
            {copied ? (
              <Check size={16} color="#10B981" />
            ) : (
              <Copy size={16} color="#6B7280" />
            )}
          </View>
        )}
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleCopy}
      className={`flex-row items-center gap-2 ${className || ""}`}
      disabled={copied}
      {...props}
    >
      {children || (
        <CustomText
          variant="body-2-medium"
          className={copied ? "text-green-600" : "text-blue-500"}
        >
          {copied ? "Copied!" : text}
        </CustomText>
      )}
      {showIcon && (
        <View>
          {copied ? (
            <Check size={16} color="#10B981" />
          ) : (
            <Copy size={16} color="#6B7280" />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
