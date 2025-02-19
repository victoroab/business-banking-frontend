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
import {
  filterList,
  getLastMonthData,
  getLastWeekData,
  typeList,
} from "../../../utils";
import { AnalyticsChartProps, GraphData } from "../../../interfaces/Global";
import ChartToolTip from "./ChartToolTip";

const TransactionChart: React.FC<AnalyticsChartProps> = ({
  data,
  withdrawableAmount,
}) => {
  const [filterBy, setFilter] = useState<string>("week");
  const [type, setType] = useState<"income" | "expenses">("income");
  const [graphData, setGraphData] = useState<GraphData[]>([]);
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
    <div className="bg-white h-[650px] shadow-[0_10px_10px_-5px_#9596970a] rounded-lg  w-[60%]">
      <div className="flex flex-col gap-3 px-10 pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-workSans text-[20px] font-medium text-[#151717]">
            Transaction Insights
          </h3>
          <div className="flex gap-2">
            {filterList.map((option, index) => (
              <p
                onClick={() => setFilter(option.value)}
                key={index}
                className={`font-workSans text-sm ${
                  filterBy === option.value
                    ? "rounded-lg bg-[#F3F4F7] cursor-pointer p-2 border font-medium "
                    : "cursor-pointer p-2"
                }`}
              >
                {option.name}
              </p>
            ))}
          </div>
        </div>
        <select
          name="time"
          onChange={(event) =>
            setType(event.target.value as "income" | "expenses")
          }
          value={type}
          className="text-sm text-greyColr font-medium bg-transparent border w-[120px] p-4 rounded-lg border-greyColr"
        >
          {typeList.map((option, index) => (
            <option value={option.value} key={index}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="font-bricolage text-pryColor font-bold text-[42px]">
          &#8358;{withdrawableAmount}
        </p>
        <div className="font-workSans text-pryColor  font-2xl flex gap-2 items-center">
          <div
            className={`percentage ${
              type === "income" ? "bg-[#F3FBF8]" : "bg-[#FFF7F5]"
            } flex justify-center items-center rounded-xl px-2 py-1`}
          >
            <p
              className={`${
                type === "income" ? "text-positive" : "text-nagative"
              }`}
            >
              23%
            </p>
          </div>
          <span className="text-greyColr font-normal"> vs last month</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="60%">
        <AreaChart
          data={graphData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={type === "income" ? "#25A96924" : "#f8cfcc"}
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor={type === "income" ? "#25A96924" : "#f8cfcc"}
                stopOpacity={0.1}
              />
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
          <Tooltip content={<ChartToolTip type={type} />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke={type === "income" ? "#25A969" : "#EE443F"}
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
