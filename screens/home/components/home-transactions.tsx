import { useTheme } from "@/contexts/theme-context";
import {
  ChevronRight,
  CreditCard,
  FileText,
  PiggyBank,
  TrendingUp,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TransactionCategoryProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor: string;
  iconBgColor: string;
}

function TransactionCategoryRow({
  icon,
  label,
  value,
  valueColor,
  iconBgColor,
}: TransactionCategoryProps) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-6">
      <View className="flex-1 flex-row items-center gap-4">
        <View
          className={`h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}
        >
          {icon}
        </View>
        <Text className="flex-1 text-base font-medium text-gray-900 dark:text-gray-100">
          {label}
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className={`text-base font-semibold ${valueColor}`}>{value}</Text>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeTransactions() {
  const { theme } = useTheme();
  const categories = [
    {
      icon: <CreditCard size={20} color="white" />,
      label: "Spending",
      value: "-$500",
      valueColor: "text-red-500",
      iconBgColor: "bg-blue-500",
    },
    {
      icon: <TrendingUp size={20} color="white" />,
      label: "Income",
      value: "$3000",
      valueColor: "text-green-500",
      iconBgColor: "bg-green-400",
    },
    {
      icon: <FileText size={20} color="white" />,
      label: "Bills",
      value: "-$800",
      valueColor: "text-red-500",
      iconBgColor: "bg-orange-300",
    },
    {
      icon: <PiggyBank size={20} color="white" />,
      label: "Savings",
      value: "$1000",
      valueColor: "text-orange-500",
      iconBgColor: "bg-orange-500",
    },
  ];

  return (
    <View className="mx-4 mt-14">
      <TouchableOpacity className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          Transactions
        </Text>
        <ChevronRight
          size={20}
          color={theme === "dark" ? "#9CA3AF" : "#000000"}
        />
      </TouchableOpacity>

      <View className="overflow-hidden rounded-lg bg-white p-4 dark:bg-gray-800">
        {categories.map((category, index) => (
          <View key={category.label}>
            <TransactionCategoryRow {...category} />
            {index < categories.length - 1 && (
              <View className="mx-4 h-px bg-gray-100 dark:bg-gray-700" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
