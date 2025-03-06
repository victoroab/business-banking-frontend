import ImageUpload from "../../../components/Upload/ImageUpload";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectAccount } from "../../../store/slice/account";
import {
  selectUpload,
  setUploadCurrentStep,
} from "../../../store/slice/uploadSlic";
import { useUploadBulkBeneficiaryMutation } from "../../../service/beneficiary";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import {
  useUploadBulkAirtimeMutation,
  useUploadBulkDataMutation,
} from "../../../service/billPayment";
import {
  useUploadBulkPensionMutation,
  useUploadBulkTransactionMutation,
} from "../../../service/transaction";
import { errorHandler } from "../../../utils";

const UploadBulkFile = () => {
  const [bulkFile, setBulkFile] = useState<File>();
  const { activeUploadTab, uploadPayload } = useAppSelector(selectUpload);
  const [uploadBulkBeneficiary, { isLoading: beneficiaryLoader }] =
    useUploadBulkBeneficiaryMutation();
  const [uploadBulkTransaction, { isLoading: transferLoader }] =
    useUploadBulkTransactionMutation();
  const [uploadBulkAirtime, { isLoading: airtimeLoader }] =
    useUploadBulkAirtimeMutation();
  const [uploadBulkData, { isLoading: dataLoader }] =
    useUploadBulkDataMutation();
  const [uploadBulkPension, { isLoading: pensionLoader }] =
    useUploadBulkPensionMutation();
  const { businessKYBDetails } = useAppSelector(selectAccount);

  const isLoading =
    activeUploadTab === 1
      ? transferLoader
      : activeUploadTab === 2
      ? airtimeLoader
      : activeUploadTab === 3
      ? dataLoader
      : activeUploadTab === 4
      ? pensionLoader
      : beneficiaryLoader;
  console.log(activeUploadTab, uploadPayload);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    try {
      if (!bulkFile) {
        toast.error("Please upload a file before submitting.");
        return;
      }
      const createFormData = (additionalFields = {}) => {
        const formData = new FormData();
        //common fields
        formData.append("file", bulkFile as File);
        formData.append("businessId", businessKYBDetails.id);
        formData.append("fromAccountNumber", uploadPayload.fromAccountNumber);
        formData.append("paymentDate", uploadPayload.paymentDate);
        Object.entries(additionalFields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        return formData;
      };

      let response;

      switch (activeUploadTab) {
        case 1:
          response = await uploadBulkTransaction(
            createFormData({ paymentMode: uploadPayload.paymentMode })
          ).unwrap();
          break;

        case 2:
          response = await uploadBulkAirtime(createFormData()).unwrap();
          break;

        case 3:
          response = await uploadBulkData(createFormData()).unwrap();
          break;

        case 4:
          response = await uploadBulkPension(
            createFormData({
              month: uploadPayload.month,
              year: uploadPayload.year,
              employerCode: uploadPayload.employerCode,
              email: uploadPayload.email,
            })
          ).unwrap();
          break;

        case 5:
          response = await uploadBulkBeneficiary(
            createFormData({
              beneficiaryType: uploadPayload.beneficiaryType,
            })
          ).unwrap();
          break;

        default:
          throw new Error("Invalid upload tab");
      }

      console.log(response);
      toast.success(response?.message);
      dispatch(setUploadCurrentStep(1));
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Upload File
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Upload your bulk payment file. Use the template to upload the list of
          beneficiaries correctly. Click to download bank codes.
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
              {isLoading ? <Spinner /> : "Upload Payment File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBulkFile;
