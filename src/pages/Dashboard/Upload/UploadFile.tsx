import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { useState } from "react";

const UploadBulkFile = () => {
  const [bulkFile, setBulkFile] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/uploads/debit-account");
  };
  console.log(bulkFile);
  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Upload File
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Upload your bulk payment file. Use the template to upload the list of
          beneficiaries correctly. Click to download bank codes.
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <ImageUpload isBase64={false} bulkUpload setDocument={setBulkFile} />
          <div className="flex justify-center  w-full gap-6">
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Upload Payment File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBulkFile;
