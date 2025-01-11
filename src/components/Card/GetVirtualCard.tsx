import PopUp from "../PopUps/PopUp";
import BackNavigation from "../ArrowBack/Back";
import Otp from "../OTP/Otp";
import { HourGlassIcon } from "../../assets/svg/CustomSVGs";
import { useAppSelector } from "../../hooks";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import { GreenCardImage } from "../../assets/svg/RequestCards";

const GetVirtualCard = () => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  return (
    <div className="flex flex-col gap-10 pr-6">
      {/* Debit Card Terms and Conditions Popup */}
      {toggle["debitCardTerms"] && (
        <PopUp id="debitCardTerms">
          <div className="bg-white rounded-lg flex flex-col text-center py-6 px-12 w-[650px] border">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage mb-4">
              Debit Card Terms and Conditions
            </h3>
            <p className="text-sm text-greyColr font-workSans">
              <strong>Card Usage</strong>
              <br />
              <br />
              The debit card is for personal use only and must not be shared or
              transferred to another person.
              <br /> It can be used for ATM withdrawals, point-of-sale
              transactions, and online payments where supported.
              <br /> The cardholder is responsible for all transactions made
              using the card.
              <br />
              <br />
              <strong>Fees and Charges</strong>
              <br />
              <br />
              Applicable fees for issuance, renewal, or replacement of the card
              will be communicated at the time of request.
              <br /> Transaction fees may apply for certain uses such as
              international payments or ATM withdrawals outside the network.
              <br />
              <br />
              <strong>Security and Liability</strong>
              <br />
              <br />
              Keep your card and PIN secure at all times. Do not share your PIN
              or write it down where others can access it.
              <br /> Report lost or stolen cards immediately to customer support
              to avoid unauthorized use.
              <br />
              The bank is not liable for unauthorized transactions resulting
              from negligence or improper card handling.
              <br />
              <br />
              <strong>Expiry and Renewal</strong>
              <br />
              <br />
              The card is valid until the expiration date printed on it.
              <br /> Renewal instructions will be provided before expiration.
              <br />
              <br />
              <strong>Card Blocking and Termination</strong>
              <br />
              <br />
              The card may be blocked or terminated for reasons including
              unauthorized use, regulatory requirements, or breach of terms.
              <br /> The cardholder can request deactivation or termination at
              any time.
              <br />
              <br />
              <strong>Changes to Terms</strong>
              <br />
              <br />
              The bank reserves the right to amend these terms with prior
              notice. Continued use of the card implies acceptance of the
              updated terms.
              <br />
              <br />
              For further inquiries, contact our support team at{" "}
              <a
                href="mailto:support@yourcompany.com"
                className="text-blue-500"
              >
                support@yourcompany.com
              </a>{" "}
              or call 0900-123-4567.
              <br />
              <br />
              Please read and understand these terms carefully before using your
              debit card.
            </p>
            <div className="flex flex-col gap-6 w-full mt-10">
              <button
                className="main-btn"
                onClick={() => handleShow("createCardPin")}
              >
                Accept Terms
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {/* Create Card PIN Popup */}
      {toggle["createCardPin"] && (
        <PopUp id="createCardPin">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <Otp
              otpCode={""}
              setOtpCode={() => {}}
              inputCount={4}
              title="Create Your Card PIN"
              paragraph={
                <p>
                  Secure your card with a 4-digit PIN. This will be used to
                  authorize payments and ensure your account stays protected.
                </p>
              }
            />
            <div className="flex flex-col gap-6 w-full">
              <button
                className="main-btn"
                onClick={() => handleShow("confirmCardPin")}
              >
                Next
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {/* Confirm Card PIN Popup */}
      {toggle["confirmCardPin"] && (
        <PopUp id="confirmCardPin">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <Otp
              otpCode={""}
              setOtpCode={() => {}}
              inputCount={4}
              title="Confirm Your Card PIN"
              paragraph={
                <p>
                  Please re-enter your 4-digit PIN to confirm and secure your
                  card.
                </p>
              }
            />
            <div className="flex flex-col gap-6 w-full">
              <button
                className="main-btn"
                onClick={() => handleShow("virtualCardIssuance")}
              >
                Confirm
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {/* Virtual card issuance */}
      {toggle["virtualCardIssuance"] && (
        <PopUp id={"virtualCardIssuance"}>
          <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-10 w-[650px] font-workSans">
            <div className="flex flex-col w-full items-center justify-center gap-4">
              <GreenCardImage />
              <div className="flex flex-col items-center justify-center gap-2">
                <p>Card Issuance Fee</p>
                <p className="text-pryColor font-bold text-xl leading-6">
                  ₦1,000.00
                </p>
              </div>
            </div>
            <div
              className="flex flex-col gap-2 text-sm w-[362px] mx-auto rounded-md px-4 py-6"
              style={{ boxShadow: "0px 1px 5px 0px #0000000A" }}
            >
              <div className="flex justify-between">
                <span>Card Price</span>
                <span>₦1,000.00</span>
              </div>
              <div className="flex justify-between">
                <span>Fee</span>
                <span>₦0.00</span>
              </div>
              <div className="flex justify-between mt-2 border-t border-lightGreyColor pt-3">
                <span>Total Debit</span>
                <span className="font-bold">₦1,000.00</span>
              </div>
              <span>*Payment for card is non-refundable</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-6">
              <button
                className="main-btn w-[472px]"
                onClick={() => handleShow("cardRequestSuccessful")}
              >
                Confirm
              </button>

              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {/* Success Popup from original CardRequest */}
      {toggle["cardRequestSuccessful"] && (
        <PopUp id="cardRequestSuccessful">
          <div className="bg-pryColor rounded-lg flex flex-col items-center justify-center p-10 gap-8 w-[650px]">
            <div className="flex flex-col justify-center items-center gap-6">
              <div
                className="bg-white p-4 gap-4 rounded-full flex items-center justify-center w-[122px] h-[122px]"
                style={{
                  boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                }}
              >
                <HourGlassIcon />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-white font-bricolage font-semibold text-xl">
                  Card Order Processing
                </h3>
                <p className="text-pryColor-Light text-sm text-center font-workSans">
                  Your Virtual Card is on its way.
                </p>
              </div>
            </div>
            <div className="flex justify-center w-full gap-6">
              <button className="yellow-frame-btn w-1/2">Share Receipt</button>
              <button className="main-btn w-1/2">Download Receipt</button>
            </div>
            <div className="flex justify-center w-[80%]">
              <button className="main-btn w-full">Back to Dashboard</button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default GetVirtualCard;
