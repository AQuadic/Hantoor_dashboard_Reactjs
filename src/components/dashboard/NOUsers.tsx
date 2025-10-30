import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats, AdminStatsResponse } from "@/api/stats/getStats";
import Loading from "../general/Loading";
import { useCanAccess } from "@/hooks/useCanAccess";

interface UserData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface CartesianPoint {
  x: number;
  y: number;
}

const COLORS = [
  "#2A32F8",
  "#FEA54D",
  "#37BF40",
  "#47BDF8",
  "#8948E6",
  "#BE2E8E",
];

const NOUsers = () => {
  const { t, i18n } = useTranslation("header");
  const isArabic = i18n.language === "ar";

  // Gate chart by permission
  const { canAccess, isLoading: isPermissionLoading } = useCanAccess({
    permissions: "view_users_count_chart_dashboard",
  });

  // Keep hooks order stable: always call useQuery, but enable it only when permission is granted
  const { data: stats, isLoading } = useQuery<AdminStatsResponse>({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
    enabled: Boolean(canAccess),
  });

  const data: UserData[] = useMemo(() => {
    if (!stats?.users_per_country) return [];

    const total = stats.users_per_country.reduce(
      (sum, item) => sum + item.user_count,
      0
    );

    return stats.users_per_country.map((item, index) => {
      const label =
        item.country?.name?.[isArabic ? "ar" : "en"] ?? t("Unknown");
      const value = item.user_count;
      const percentage = total > 0 ? (value / total) * 100 : 0;

      return {
        label,
        value,
        color: COLORS[index % COLORS.length],
        percentage,
      };
    });
  }, [stats, isArabic, t]);

  // If permission state still loading or user can't access, hide the component
  if (isPermissionLoading) return null;
  if (!canAccess) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): CartesianPoint => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const createPieSlice = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ): string => {
    const start = polarToCartesian(0, 0, outerRadius, endAngle);
    const end = polarToCartesian(0, 0, outerRadius, startAngle);
    const innerStart = polarToCartesian(0, 0, innerRadius, endAngle);
    const innerEnd = polarToCartesian(0, 0, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ");
  };

  let currentAngle = 0;
  const gap = 4;

  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle - gap;
    currentAngle += angle;

    return {
      ...item,
      path: createPieSlice(startAngle, endAngle, 60, 100),
      startAngle,
      endAngle,
    };
  });

  if (isLoading) return <Loading />;

  return (
    <section className="w-[251px] h-full bg-[#FFFFFF] rounded-[15px] mt-[15px] p-6">
      <h2 className="text-[#000000] text-[23px] font-bold mb-4">
        {t("NumofUsers")}
      </h2>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg
            width="200"
            height="200"
            viewBox="-100 -100 200 200"
            className="transform rotate-0"
          >
            {segments.map((segment) => (
              <path
                key={`${segment.label}-${segment.value}`}
                d={segment.path}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>

          <div
            dir="ltr"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-[#2A32F8] font-medium">
                {t("users")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4" style={{ direction: "rtl" }}>
        {data.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className="flex items-center justify-between gap-2"
          >
            <div>
              <div
                className="w-[9px] h-[23px] rounded-sm"
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {item.value}
              </span>
              <span className="text-xs font-normal text-[#808080]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NOUsers;
