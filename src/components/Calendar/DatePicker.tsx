import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

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
  const [openCalendar, setOpenCalendar] = useState(false);
  const handleSelect = (date: any) => {
    setSelectedDate(date);
    setOpenCalendar(false);
  };
  return (
    <div className="flex flex-col relative">
      <p className="font-workSans font-medium text-greyColr">{label}</p>
      <div
        className="flex cursor-pointer"
        onClick={() => setOpenCalendar(!openCalendar)}
      >
        <input
          className="form-controls cursor-pointer"
          placeholder="DD/MM/YYYY"
          value={selectedDate?.toLocaleDateString()}
        />
      </div>

      {openCalendar && (
        <div className="flex absolute right-[0px] top-[50px]">
          <Calendar
            value={selectedDate}
            onChange={(date: any) => handleSelect(date)}
            className={`form-controls ${filter && "shadow-md"}`}
          />
        </div>
      )}
    </div>
  );
};

export default Calender;
