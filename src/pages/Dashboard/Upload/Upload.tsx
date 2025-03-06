import Navbar from "../../../components/Navbar/Navbar";
import {
  bulkAirtime,
  bulkData,
  bulkPayment,
  pensionUpload,
  UploadBeneficiaryList,
  uploadHeader,
} from "../../../utils";
import ProgressLayout from "../../../layout/ProgressLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { StepComponentProps } from "../../../interfaces/Global";
import UploadDebitAccount from "./DebitAccount";
import UploadPaymentMode from "./PaymentMethod";
import UploadPaymentDate from "./PaymentDate";
import UploadBulkFile from "./UploadFile";
import UploadEmployerDetails from "./EmployerDetails";
import UploadPaymentPeriod from "./PaymentPeriod";
import {
  selectUpload,
  setActiveUploadTab,
  setUploadCurrentStep,
} from "../../../store/slice/uploadSlic";
import StepBackNavigation from "../../../components/ArrowBack/StepBackArrow";
import BeneficiaryType from "./BeneficiaryType";

const Upload = () => {
  const { activeUploadTab, uploadCurrentStep } = useAppSelector(selectUpload);
  const dispatch = useAppDispatch();
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

  const stepsBulkPaymentComponents: StepComponentProps[] = [
    { step: 1, component: UploadDebitAccount },
    { step: 2, component: UploadPaymentMode },
    { step: 3, component: UploadPaymentDate },
    { step: 4, component: UploadBulkFile },
  ];

  const stepsBulkAirtimeComponents: StepComponentProps[] = [
    { step: 1, component: UploadDebitAccount },
    { step: 2, component: UploadPaymentMode },
    { step: 3, component: UploadBulkFile },
  ];

  const stepsBulkDataComponents: StepComponentProps[] = [
    { step: 1, component: UploadDebitAccount },
    { step: 2, component: UploadPaymentMode },
    { step: 3, component: UploadPaymentDate },
    { step: 4, component: UploadBulkFile },
  ];

  const stepsPensionUploadComponents: StepComponentProps[] = [
    { step: 1, component: UploadEmployerDetails },
    { step: 2, component: UploadPaymentPeriod },
    { step: 3, component: UploadBulkFile },
  ];

  const stepsBeficaneryListComponents: StepComponentProps[] = [
    { step: 1, component: BeneficiaryType },
    { step: 2, component: UploadBulkFile },
  ];
  const stepsComponents =
    activeUploadTab === 2
      ? stepsBulkAirtimeComponents
      : activeUploadTab === 3
      ? stepsBulkDataComponents
      : activeUploadTab === 4
      ? stepsPensionUploadComponents
      : activeUploadTab === 5
      ? stepsBeficaneryListComponents
      : stepsBulkPaymentComponents;

  return (
    <div className="border">
      <Navbar
        title="Bulk Uploads"
        subtitle="Simplify bulk payments by uploading an Excel file directly to your Alert account"
      />
      <div className="flex px-10 flex-col">
        <div className="flex transition-all duration-300 border-b w-[80%]">
          {uploadHeader.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-4 focus:outline-none w-full transition-colors text-workSans font-medium duration-300 ${
                activeUploadTab === tab.id
                  ? "text-greyColr border-b-2 border-secColor"
                  : "text-[#8e949a]"
              }`}
              onClick={() => {
                dispatch(setActiveUploadTab(tab.id));
                // navigate(tab.link);
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex  justify-start w-48 my-8">
          <StepBackNavigation
            stateCurrentStep={uploadCurrentStep}
            setStateCurrentStep={setUploadCurrentStep}
          />
        </div>
        <ProgressLayout
          progressSteps={uploadSteps}
          stepsComponents={stepsComponents}
          isDashboard
          stateCurrentStep={uploadCurrentStep}
          setStateCurrentStep={setUploadCurrentStep}
        />
      </div>
    </div>
  );
};

export default Upload;
