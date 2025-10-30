import React from "react";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats, VehiclePerCountry } from "@/api/stats/getStats";
import { useCanAccess } from "@/hooks/useCanAccess";

const chartConfig = {
  cars: {
    label: "عدد السيارات",
    color: "#2A32F826",
  },
} satisfies ChartConfig;

const DashboardChart = () => {
  const { t, i18n } = useTranslation("header");
  const isArabic = i18n.language === "ar";

  // Hide chart if user doesn't have the required permission
  const { canAccess, isLoading: isPermissionLoading } = useCanAccess({
    permissions: "view_cars_count_dashboard",
  });

  // Keep hook order stable: call useQuery always but only enable fetching when permission is granted
  const { data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
    enabled: Boolean(canAccess),
  });

  // If permission state is still loading or user can't access, hide the chart
  if (isPermissionLoading) return null;
  if (!canAccess) return null;

  const chartData =
    data?.vehicles_per_country?.map((item: VehiclePerCountry) => ({
      day: isArabic ? item.country?.name?.ar : item.country?.name?.en,
      cars: item.vehicle_count,
    })) || [];

  return (
    <section
      className="h-auto bg-[#FFFFFF] py-4 px-7 mt-[15px] rounded-[15px] flex-1"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#000000] text-[23px] font-bold">
          {t("NumofCars")}
        </h2>
        <DashboardDatePicker />
      </div>

      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[360px] w-full bg-[#F4F4FE] rounded-[10px]"
      >
        <BarChart
          data={chartData}
          height={300}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2A32F8" />
              <stop offset="100%" stopColor="#2A32F8" />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#6b7280" }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            domain={[0, "dataMax + 2"]}
            width={30}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar
            dataKey="cars"
            fill="url(#blueGradient)"
            radius={[8, 8, 8, 8]}
            barSize={12}
            background={{ fill: "#E0E7FF" }}
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default DashboardChart;
