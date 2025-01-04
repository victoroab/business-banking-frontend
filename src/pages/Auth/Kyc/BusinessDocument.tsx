import React, { useState } from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useVerifyBusinessDocumentsMutation } from "../../../service/kyb";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

const BusinessDocument: React.FC<KYCPageProps> = () => {
  const [cacDocument, setCACDocument] = useState<string>("");
  const [memorandumDocument, setMemorandumDocument] = useState<string>("");
  const [scumlDocument, setScumlDocument] = useState<string>("");
  const [utilityDocument, setUtilityDocument] = useState<string>("");
  const [businessDocument, { isLoading }] =
    useVerifyBusinessDocumentsMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      const requiredData = {
        cac: cacDocument,
        memorandum: memorandumDocument,
        scuml: scumlDocument,
        utilityBill: utilityDocument,
      };
      const response = await businessDocument(requiredData).unwrap();
      toast.success(response?.message);
      dispatch(setKycCurrentStep(7));
    } catch (error: any) {}
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center px-4">
      <div className="flex flex-col gap-4">
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
          title="Utility Bill (Valid bill within the last 90 datys)"
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
          {isLoading ? <Spinner /> : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default BusinessDocument;
