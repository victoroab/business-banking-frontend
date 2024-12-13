import { useState } from "react";
import FormInput from "../FormInput";
import ImageUpload from "../Upload/ImageUpload";

const AddDirector = () => {
  const [addNewDirector, setAddNewDirector] = useState<boolean>(true);
  const handleAddNewDirector = () => {
    setAddNewDirector(true);
  };

  return (
    <>
      {addNewDirector && (
        <div className="flex flex-col gap-4 w-[100%]">
          <FormInput id={""} placeholder="Director's First Name" />
          <FormInput id={""} placeholder="Director's Last Name" />
          <FormInput id={""} placeholder="Means of Identification" />
          <FormInput id={""} placeholder="National Identification Number" />
          <ImageUpload title="Upload Director's ID Card" />

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddNewDirector();
              }}
              className="yellow-frame-btn"
            >
              + Add Director
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDirector;
