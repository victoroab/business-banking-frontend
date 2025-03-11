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
  calculateTotalAmount,
  filterList,
  getLastMonthData,
  getLastWeekData,
  typeList,
} from "../../../utils";
import { AnalyticsChartProps, GraphData } from "../../../interfaces/Global";
import ChartToolTip from "./ChartToolTip";
import { useGetAllTransactionsQuery } from "../../../service/transaction";
import Spinner from "../../Spinner/Spinner";
import NoData from "../../NoData/NoData";

const TransactionChart: React.FC<AnalyticsChartProps> = () => {
  const { data, isLoading } = useGetAllTransactionsQuery({});

  const newList = data?.data?.data
    ? data.data.data.map((item: any) => ({
        id: item?.id,
        amount: parseInt(item?.amount as string),
        createdAt: item?.createdAt,
      }))
    : [];

  const [filterBy, setFilter] = useState<string>("week");
  const [type, setType] = useState<"amount" | "expenses">("amount");
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const getWeekData = useCallback(() => {
    const today = new Date();
    const lastWeek = subWeeks(today, 1);
    const lastWeekData = getLastWeekData(newList);
    const everyday = eachDayOfInterval({ start: lastWeek, end: today });

    const weeklyData = everyday.map((date) => ({
      name: format(date, "E"),
      amount: lastWeekData
        ?.filter((item: any) => isSameDay(parseJSON(item.createdAt), date))
        ?.reduce(
          (total: number, currentItem: any) => total + currentItem.amount,
          0
        ),
    }));
    const cal = calculateTotalAmount(weeklyData);
    setTotalAmount(cal);
    return weeklyData;
  }, [newList]);
  const getMonthData = useCallback(() => {
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    const lastMonthData = getLastMonthData(newList);
    const everyWeek = eachWeekOfInterval({ start: lastMonth, end: today });

    const monthlyData = everyWeek.map((date) => ({
      name: format(date, "MMM d"),
      amount: lastMonthData
        ?.filter((item: any) => isSameWeek(parseJSON(item.createdAt), date))
        ?.reduce(
          (total: number, currentItem: any) => total + currentItem.amount,
          0
        ),
    }));
    const cal = calculateTotalAmount(monthlyData);
    setTotalAmount(cal);
    return monthlyData;
  }, [newList]);
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
  }, [filterBy]);

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
            setType(event.target.value as "amount" | "expenses")
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
          &#8358;{totalAmount}
        </p>
        <div className="font-workSans text-pryColor  font-2xl flex gap-2 items-center">
          <div
            className={`percentage ${
              type === "amount" ? "bg-[#F3FBF8]" : "bg-[#FFF7F5]"
            } flex justify-center items-center rounded-xl px-2 py-1`}
          >
            <p
              className={`${
                type === "amount" ? "text-positive" : "text-nagative"
              }`}
            >
              23%
            </p>
          </div>
          <span className="text-greyColr font-normal"> vs last month</span>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {newList?.length > 0 ? (
            <ResponsiveContainer width="100%" height="60%">
              <AreaChart
                data={graphData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={type === "amount" ? "#25A96924" : "#f8cfcc"}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor={type === "amount" ? "#25A96924" : "#f8cfcc"}
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
                  dataKey="amount"
                  stroke={type === "amount" ? "#25A969" : "#EE443F"}
                  fill="url(#colorUv)"
                  fillOpacity={1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default TransactionChart;
