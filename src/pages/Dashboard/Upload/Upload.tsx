import Navbar from "../../../components/Navbar/Navbar";
import {
  bulkAirtime,
  bulkData,
  bulkPayment,
  pensionUpload,
  UploadBeneficiaryList,
  uploadHeader,
} from "../../../utils";
import {
  selectDashboard,
  setActiveUploadTab,
} from "../../../store/slice/dashboardSlice";
import ProgressLayout from "../../../layout/ProgressLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { activeUploadTab } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uploadSteps =
    activeUploadTab === 2
      ? bulkAirtime
      : activeUploadTab === 3
      ? bulkData
      : activeUploadTab === 4
      ? pensionUpload
      : activeUploadTab === 5
      ? UploadBeneficiaryList
      : bulkPayment;

  return (
    <div className="border">
      <Navbar
        title="Bulk Uploads"
        subtitle="Simplify bulk payments by uploading an Excel file directly to your Alert account"
      />
      <div className="flex px-10 flex-col">
        <div className="flex transition-all duration-300 border-b w-[60%]">
          {uploadHeader.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-4 focus:outline-none transition-colors text-workSans font-medium duration-300 ${
                activeUploadTab === tab.id
                  ? "text-greyColr border-b-2 border-secColor"
                  : "text-[#8e949a]"
              }`}
              onClick={() => {
                dispatch(setActiveUploadTab(tab.id));
                navigate(tab.link);
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <ProgressLayout
          progressSteps={uploadSteps}
          isUpload={true}
          isDashboard={false}
        />
      </div>
    </div>
  );
};

export default Upload;
