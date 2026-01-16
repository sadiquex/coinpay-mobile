import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/contexts/theme-context";

interface BottomModalProps {
  /**
   * Ref to the bottom sheet modal
   */
  bottomSheetModalRef: React.RefObject<any>;
  /**
   * Snap points for the modal (e.g., ['50%', '75%'])
   */
  snapPoints?: string[];
  /**
   * Initial index to open at
   */
  index?: number;
  /**
   * Callback when modal closes
   */
  onClose?: () => void;
  /**
   * Children to render inside the modal
   */
  children: React.ReactNode;
  /**
   * Enable over drag
   */
  enableOverDrag?: boolean;
  /**
   * Enable pan down to close
   */
  enablePanDownToClose?: boolean;
}

export const BottomModal: React.FC<BottomModalProps> = ({
  bottomSheetModalRef,
  snapPoints = ["50%", "75%"],
  index = 0,
  onClose,
  children,
  enableOverDrag = false,
  enablePanDownToClose = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Handle backdrop press
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={() => {
          bottomSheetModalRef.current?.dismiss();
          onClose?.();
        }}
      />
    ),
    [bottomSheetModalRef, onClose]
  );

  // Handle sheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose?.();
      }
    },
    [onClose]
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose}
      enableOverDrag={enableOverDrag}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? "#6B7280" : "#9CA3AF",
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
