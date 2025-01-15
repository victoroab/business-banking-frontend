import { ActivateCard, BlockIcon, RightArrow } from "../../../assets/svg/Card";
import BackNavigation from "../../../components/ArrowBack/Back";
import Card from "../../../components/Card/ATMCard";
import CancelCardRequest from "../../../components/Card/CancelCardRequest";
import Stepper from "../../../components/Card/Stepper/Stepper";
import Navbar from "../../../components/Navbar/Navbar";
import { useGlobalHooks } from "../../../hooks/globalHooks";

interface TrackCardProps {
  isBranchPickup?: boolean;
}

const stepsData = (isBranchPickup: boolean): string[] => [
  "Order Received",
  "Order Processing",
  "Printing Card",
  "Ready for Delivery",
  isBranchPickup ? "Ready for Pickup at Branch" : "Sent Out for Delivery",
];

const TrackCard: React.FC<TrackCardProps> = ({ isBranchPickup = false }) => {
  const steps = stepsData(isBranchPickup);
  const { handleShow } = useGlobalHooks();
  const virtualCardNumber = "8765432187654321";

  return (
    <>
      <Navbar
        title="Cards"
        subtitle="Easily apply for a debit or credit card tailored to your needs."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-start w-48">
          <BackNavigation />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center gap-12 w-full mx-auto font-workSans">
            <div className="shrink-0">
              <Card type="virtual" cardNumber={virtualCardNumber} />
            </div>
            <Stepper steps={steps} currentStep={2} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div
              className={`w-fit py-1 px-[6px] transition-all bg-[#456EFE0D] text-statusBlue`}
            >
              <h2 className="text-xs font-medium text-center font-workSans">
                Physical Card
              </h2>
            </div>
          </div>
          <div className="py-8 flex flex-col justify-center items-center gap-6">
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-full mx-auto cursor-pointer max-w-[1012px]"
              style={{
                boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
              onClick={() => handleShow("cancelCardRequest")}
            >
              <div className="flex items-center gap-2">
                <BlockIcon />
                Cancel Card Request
              </div>
              <RightArrow />
            </div>
            <CancelCardRequest />
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-full mx-auto cursor-pointer max-w-[1012px]"
              style={{
                boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <ActivateCard />
                Activate Card
              </div>
              <RightArrow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackCard;
