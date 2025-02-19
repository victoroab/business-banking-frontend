import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  label?: string;
  filter?: boolean;
}
const Calender = ({
  selectedDate,
  setSelectedDate,
  label,
  filter,
}: DatePickerProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-workSans font-medium text-greyColr">{label}</p>
      <DatePicker
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
        className={`form-controls ${filter && "shadow-md"}`}
      />
    </div>
  );
};

export default Calender;
