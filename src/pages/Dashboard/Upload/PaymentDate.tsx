import Calender from "../../../components/Calendar/DatePicker";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";

const UploadPaymentDate = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleSubmit = () => {
    dispatch(setUploadPayload({ paymentDate: selectedDate }));
    dispatch(setUploadCurrentStep(4));
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Add Payment Date
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Keep your payments organized by setting a due date for each
          transaction
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className="flex justify-center  w-full gap-6">
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPaymentDate;
