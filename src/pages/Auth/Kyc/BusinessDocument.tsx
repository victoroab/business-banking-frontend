import { useRef, useState } from "react";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { ArrowDownIcon } from "../../../assets/svg/Auth";
import { useNavigate } from "react-router-dom";
import { businessDocuments, errorHandler } from "../../../utils";
import toast from "react-hot-toast";
import { useVerifyBusinessDocumentsMutation } from "../../../service/kyb";
import Spinner from "../../../components/Spinner/Spinner";

const BusinessDocument = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    cac: undefined as File | undefined,
    memorandum: undefined as File | undefined,
    scuml: undefined as File | undefined,
    utility: undefined as File | undefined,
  });
  const [businessDocument, { isLoading }] =
    useVerifyBusinessDocumentsMutation();

  const handleSetDocument = (name: string, value: File) => {
    console.log(name);
    setDocuments((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("cac", documents.cac as File);
      formData.append("memorandum", documents.memorandum as File);
      formData.append("scuml", documents.scuml as File);
      formData.append("utilityBill", documents.utility as File);

      const response = await businessDocument(formData).unwrap();
      toast.success(response?.message);
      navigate("/kyb/business-address");
    } catch (error: unknown) {
      errorHandler(error);
    }
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
        {businessDocuments.map((document) => (
          <ImageUpload
            key={document.name}
            isBase64={false}
            title={document.title}
            required
            name={document.name}
            setDocument={(file) => handleSetDocument(`${document.name}`, file)}
          />
        ))}
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
