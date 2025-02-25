import React from "react";
import { TooltipProps } from "recharts";

const ChartToolTip: React.FC<
  TooltipProps<any, any> & { type: "amount" | "expenses" }
> = ({ active, payload, label, type }) => {
  if (!active || !payload || payload.length === 0) return null;

  const amount = payload[0]?.value;
  return (
    <div
      className="font-workSans bg-white text-[#777777] text-sm font-normal gap-2 flex flex-col rounded-lg"
      style={{
        padding: "10px",
        boxShadow: "0px 4px 10px rgba(169, 169, 169, 0.2)",
      }}
    >
      <div>
        <p>{label}</p>
      </div>
      <div className="rounded-lg bg-[#F3F4F7] p-3">
        amount:{" "}
        <span
          className={`${
            type === "amount" ? "text-positive" : "text-nagative"
          } font-semibold`}
        >
          #{amount}.00
        </span>
      </div>
    </div>
  );
};

export default ChartToolTip;
