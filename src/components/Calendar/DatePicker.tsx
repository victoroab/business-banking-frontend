import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}
const Calender = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: any) => setSelectedDate(date)}
      className="form-controls"
    />
  );
};

export default Calender;
