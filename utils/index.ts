import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

/**
 * Copies text to clipboard with haptic feedback and toast notification
 * @param text - The text to copy to clipboard
 * @param showFeedback - Whether to show haptic feedback (default: true)
 * @param showToast - Whether to show toast notification (default: true)
 * @param toastMessage - Custom toast message (default: "Copied to clipboard")
 * @returns Promise<boolean> - Returns true if copy was successful, false otherwise
 */
export async function copyToClipboard(
  text: string,
  showFeedback: boolean = true,
  showToast: boolean = true,
  toastMessage?: string
): Promise<boolean> {
  try {
    await Clipboard.setStringAsync(text);

    if (showFeedback) {
      // Provide haptic feedback for successful copy
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    if (showToast) {
      Toast.show({
        type: "success",
        text1: toastMessage || "Copied to clipboard",
        // position: "bottom",
        visibilityTime: 2000,
      });
    }

    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);

    if (showFeedback) {
      // Provide error feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    if (showToast) {
      Toast.show({
        type: "error",
        text1: "Failed to copy",
        // position: "bottom",
        visibilityTime: 2000,
      });
    }

    return false;
  }
}

/**
 * Gets text from clipboard
 * @returns Promise<string | null> - Returns the clipboard text or null if empty/error
 */
export async function getFromClipboard(): Promise<string | null> {
  try {
    const text = await Clipboard.getStringAsync();
    return text || null;
  } catch (error) {
    console.error("Error reading from clipboard:", error);
    return null;
  }
}
