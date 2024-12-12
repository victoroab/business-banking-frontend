import React, { useState, useCallback, useEffect } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  format,
  subWeeks,
  subMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  isSameDay,
  isSameWeek,
  parseJSON,
} from "date-fns";
import { getLastMonthData, getLastWeekData } from "../../../utils";

interface AnalyticsChartProps {
  data: { createdAt: string }[];
}

interface GraphData {
  name: string;
  income: number;
}

const TransactionChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const [filterBy, setFilter] = useState<"week" | "month">("week");
  const [graphData, setGraphData] = useState<GraphData[]>([]);

  const options = [
    { value: "week", name: "Weekly" },
    { value: "month", name: "Monthly" },
  ];

  const getWeekData = useCallback(() => {
    const today = new Date();
    const lastWeek = subWeeks(today, 1);
    const lastWeekData = getLastWeekData(data);
    const everyday = eachDayOfInterval({ start: lastWeek, end: today });

    return everyday.map((date) => ({
      name: format(date, "E"),
      income: lastWeekData
        .filter((item: any) => isSameDay(parseJSON(item.createdAt), date))
        .reduce(
          (total: number, currentItem: any) => total + currentItem.income,
          0
        ),
    }));
  }, [data]);

  const getMonthData = useCallback(() => {
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    const lastMonthData = getLastMonthData(data);
    const everyWeek = eachWeekOfInterval({ start: lastMonth, end: today });

    return everyWeek.map((date) => ({
      name: format(date, "MMM d"),
      income: lastMonthData
        .filter((item: any) => isSameWeek(parseJSON(item.createdAt), date))
        .reduce(
          (total: number, currentItem: any) => total + currentItem.income,
          0
        ),
    }));
  }, [data]);
  useEffect(() => {
    switch (filterBy) {
      case "week":
        setGraphData(getWeekData());
        break;
      case "month":
        setGraphData(getMonthData());
        break;
      default:
        break;
    }
  }, [filterBy, getWeekData, getMonthData]);

  return (
    <div className="bg-white h-[567px] shadow-[0_10px_10px_-5px_#9596970a] rounded-lg  w-[60%]">
      <div className="flex flex-col gap-4 px-10 pt-2">
        <h3 className="text-lg font-workSans text-[20px] font-medium text-[#151717]">
          Transaction Insights
        </h3>
        <select
          name="time"
          onChange={(event) =>
            setFilter(event.target.value as "week" | "month")
          }
          value={filterBy}
          className="text-sm text-[#4e5152] bg-transparent border  w-[100px]"
        >
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="font-bricolage text-pryColor font-bold text-[42px]">
          #50,000.00
        </p>
        <div className="font-workSans text-pryColor  font-2xl flex gap-2 items-center">
          <div className="percentage bg-[#F3FBF8] flex justify-center items-center rounded-xl px-2 py-1">
            <p className="text-positive">23%</p>
          </div>
          <span className="text-greyColr font-normal"> vs last month</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="62%">
        <AreaChart
          data={graphData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25A96924" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#25A96924" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickLine={{ stroke: "white" }}
            axisLine={{ stroke: "white" }}
            dy={10}
            dx={15}
            interval="preserveStartEnd"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#25A969"
            fill="url(#colorUv)"
            fillOpacity={1}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
