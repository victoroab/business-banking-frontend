import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

interface DatePickerProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
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
    console.log(date);
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
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
          value={selectedDate}
        />
      </div>

      {openCalendar && (
        <div className="flex absolute right-[0px] top-[50px] z-50">
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
