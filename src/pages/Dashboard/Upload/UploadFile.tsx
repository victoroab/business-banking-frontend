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

      if (activeUploadTab === 1) {
        const transferFormData = new FormData();
        transferFormData.append(
          "fromAccountNumber",
          uploadPayload.fromAccountNumber
        );
        transferFormData.append("paymentMode", uploadPayload.paymentMode);
        transferFormData.append("paymentDate", uploadPayload.paymentDate);
        transferFormData.append("file", bulkFile as File);
        transferFormData.append("businessId", businessKYBDetails.id);
        const response = await uploadBulkTransaction(transferFormData).unwrap();
        console.log(response);
        toast.success(response?.message);
        dispatch(setUploadCurrentStep(1));
      } else if (activeUploadTab === 2 || activeUploadTab === 3) {
        const billFormData = new FormData();
        billFormData.append(
          "fromAccountNumber",
          uploadPayload.fromAccountNumber
        );
        billFormData.append("paymentDate", uploadPayload.paymentDate);
        billFormData.append("file", bulkFile as File);
        billFormData.append("businessId", businessKYBDetails.id);
        const response =
          activeUploadTab === 2
            ? await uploadBulkAirtime(billFormData).unwrap()
            : await uploadBulkData(billFormData).unwrap();
        console.log(response);
        toast.success(response?.message);
        dispatch(setUploadCurrentStep(1));
      } else if (activeUploadTab === 4) {
        const pensionFormData = new FormData();
        pensionFormData.append("file", bulkFile as File);
        pensionFormData.append(
          "fromAccountNumber",
          uploadPayload.fromAccountNumber
        );
        pensionFormData.append("paymentDate", uploadPayload.paymentDate);
        pensionFormData.append("month", businessKYBDetails.id);
        pensionFormData.append("year", businessKYBDetails.id);
        pensionFormData.append("employerCode", businessKYBDetails.id);
        pensionFormData.append("email", businessKYBDetails.id);
        pensionFormData.append("businessId", businessKYBDetails.id);

        const response = await uploadBulkPension(pensionFormData).unwrap();
        console.log(response);
        toast.success(response?.message);
        dispatch(setUploadCurrentStep(1));
      } else if (activeUploadTab === 5) {
        const beneficiaryFormData = new FormData();
        beneficiaryFormData.append("file", bulkFile as File);
        beneficiaryFormData.append("businessId", businessKYBDetails.id);
        beneficiaryFormData.append(
          "beneficiaryType",
          uploadPayload.beneficiaryType
        );
        const response = await uploadBulkBeneficiary(
          beneficiaryFormData
        ).unwrap();
        console.log(response);
        toast.success(response?.message);
        dispatch(setUploadCurrentStep(1));
      }
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
