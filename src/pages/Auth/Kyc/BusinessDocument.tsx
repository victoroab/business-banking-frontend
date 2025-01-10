import { useRef, useState } from "react";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { ArrowDownIcon } from "../../../assets/svg/Auth";
import { useNavigate } from "react-router-dom";
// import { useVerifyBusinessDocumentsMutation } from "../../../service/kyb";
// import toast from "react-hot-toast";
// import Spinner from "../../../components/Spinner/Spinner";

const BusinessDocument = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [cacDocument, setCACDocument] = useState<string>("");
  const [memorandumDocument, setMemorandumDocument] = useState<string>("");
  const [scumlDocument, setScumlDocument] = useState<string>("");
  const [utilityDocument, setUtilityDocument] = useState<string>("");
  const navigate = useNavigate();
  // const [businessDocument, { isLoading }] =
  //   useVerifyBusinessDocumentsMutation();

  console.log(cacDocument, memorandumDocument, scumlDocument, utilityDocument);
  const handleSubmit = async () => {
    try {
      // const requiredData = {
      //   cac: cacDocument,
      //   memorandum: memorandumDocument,
      //   scuml: scumlDocument,
      //   utilityBill: utilityDocument,
      // };
      // const response = await businessDocument(requiredData).unwrap();
      // toast.success(response?.message);
      navigate("/kyb/business-address");
    } catch (error: any) {}
  };

  const scrollToBottom = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center relative">
      <div className="flex flex-col gap-4 w-full px-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Document
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full px-4">
        <ImageUpload
          isBase64={false}
          title="CAC Certificate of your business"
          required
          setDocument={setCACDocument}
        />
        <ImageUpload
          isBase64={false}
          title="Memorandum of Incorporation"
          required
          setDocument={setMemorandumDocument}
        />
        <ImageUpload
          isBase64={false}
          title="SCUML Document"
          required
          setDocument={setScumlDocument}
        />
        <ImageUpload
          isBase64={false}
          title="Utility Bill (Valid bill within the last 90 days)"
          required
          setDocument={setUtilityDocument}
        />
      </div>
      <div className="flex justify-center w-full gap-6 px-4">
        <button
          className="main-btn w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Continue
          {/* {isLoading ? <Spinner /> : "Continue"} */}
        </button>
      </div>

      <div
        className="flex bg-white rounded-3xl text-pryColor font-bricolage items-center gap-2 fixed bottom-[100px] px-6 py-3 font-semibold cursor-pointer"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        onClick={scrollToBottom}
      >
        <ArrowDownIcon />
        Scroll Down
      </div>
      <div ref={formRef}></div>
    </div>
  );
};

export default BusinessDocument;
