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
      <View className="flex-row items-center gap-4 flex-1">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </View>
        <Text className="text-base font-medium flex-1">{label}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className={`text-base font-semibold ${valueColor}`}>{value}</Text>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeTransactions() {
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
    <View className="mt-12 mx-4">
      <TouchableOpacity className="flex-row items-center justify-between mb-4">
        <Text className="font-semibold text-lg">Transactions</Text>
        <ChevronRight size={20} color="black" />
      </TouchableOpacity>

      <View className="bg-white rounded-lg overflow-hidden p-4">
        {categories.map((category, index) => (
          <View key={category.label}>
            <TransactionCategoryRow {...category} />
            {index < categories.length - 1 && (
              <View className="h-px bg-gray-100 mx-4" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
