import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { CustomText } from "@/components/ui/custom-text";
import {
  ChartCandlestick,
  CreditCard,
  FileText,
  PiggyBank,
  SlidersHorizontal,
} from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";

type FilterType = "spending" | "income" | "bills" | "savings";

interface FilterConfig {
  type: FilterType;
  label: string;
  IconComponent: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  bgColor: string;
  title: string;
}

const FILTERS: FilterConfig[] = [
  {
    type: "spending",
    label: "Spending",
    IconComponent: CreditCard,
    color: "#2F4CF3",
    bgColor: "bg-blue-100",
    title: "Spending List",
  },
  {
    type: "income",
    label: "Income",
    IconComponent: ChartCandlestick,
    color: "#10B981",
    bgColor: "bg-green-100",
    title: "Income List",
  },
  {
    type: "bills",
    label: "Bills",
    IconComponent: FileText,
    color: "#F59E0B",
    bgColor: "bg-yellow-100",
    title: "Bills List",
  },
  {
    type: "savings",
    label: "Savings",
    IconComponent: PiggyBank,
    color: "#F59E0B",
    bgColor: "bg-orange-100",
    title: "Savings List",
  },
];

export default function SpendingTransactions() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState<FilterType>("spending");

  const activeFilterConfig = FILTERS.find((f) => f.type === activeFilter);

  return (
    <View className="gap-4">
      {/* filters */}
      <View className="flex flex-row items-center justify-between rounded-lg bg-white p-4 dark:bg-gray-800">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.type;
          const IconComponent = filter.IconComponent;
          return (
            <TouchableOpacity
              key={filter.type}
              className="flex items-center gap-2"
              onPress={() => setActiveFilter(filter.type)}
            >
              <View
                className={`h-10 w-10 items-center justify-center rounded-full ${
                  isActive ? filter.bgColor : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <IconComponent
                  size={20}
                  color={isActive ? filter.color : "#9CA3AF"}
                />
              </View>
              <CustomText
                className={isActive ? "" : "text-gray-500 dark:text-gray-400"}
                style={isActive ? { color: filter.color } : undefined}
              >
                {filter.label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* transactions list */}
      <View className="flex flex-row items-center justify-between">
        <CustomText variant="label-1-medium" className="dark:text-white">
          {activeFilterConfig?.title || "Spending List"}
        </CustomText>

        <SlidersHorizontal size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
      </View>

      <View className="gap-4">
        {transactions.map((transaction, index) => (
          <React.Fragment key={transaction.name}>
            <TransactionItem transaction={transaction} />
            {index < transactions.length - 1 && (
              <View className="h-px w-full bg-gray-200 dark:bg-gray-700" />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      {/* left - icon, name and date */}
      <View className="flex flex-row items-center gap-2">
        {/* netflix icon */}
        <Image
          source={{
            uri: transaction.icon,
          }}
          className="h-10 w-10 rounded-full bg-white"
        />

        {/* name and date  */}
        <View>
          <CustomText variant="label-1-medium" className="dark:text-white">
            {transaction.name}
          </CustomText>
          <CustomText
            variant="caption-medium"
            className="text-gray-500 dark:text-gray-400"
          >
            {transaction.date}
          </CustomText>
        </View>
      </View>

      {/* right - amount */}
      <CustomText className="font-semibold text-red-600 dark:text-red-500">
        - ${transaction.amount}
      </CustomText>
    </View>
  );
};

interface Transaction {
  icon: string;
  name: string;
  date: string;
  amount: number;
}

const transactions: Transaction[] = [
  // netflix for 13 dollars
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/500px-Netflix_icon.svg.png?20220806170125",
    name: "Netflix",
    date: "1st Jul at 7:20pm",
    amount: 13,
  },

  // google for 10 dollars
  {
    icon: "https://www.figma.com/community/resource/29e2e9ca-07f7-49d5-8b2a-09d7e6328b98/thumbnail",
    name: "Google",
    date: "1st Jul at 7:20pm",
    amount: 10,
  },

  // amazon for 15 dollars
  {
    icon: "https://images.icon-icons.com/836/PNG/512/Amazon_icon-icons.com_66787.png",
    name: "Amazon",
    date: "1st Jul at 7:20pm",
    amount: 15,
  },

  // name cheap for 13
  {
    icon: "https://cdn-1.webcatalog.io/catalog/namecheap/namecheap-icon-unplated.png?v=1714775221844",
    name: "Namecheap",
    date: "1st Jul at 7:20pm",
    amount: 13,
  },
];
