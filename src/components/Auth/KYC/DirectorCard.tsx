import React from "react";
import { Director } from "../../../interfaces/service/kyb";
import { DeleteIcon, EditIcon } from "../../../assets/svg/Accout";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";

interface EventLineUpProps {
  onEdit: (director: Director) => void;
  onDelete: (id: number) => void;
}

const AddedDirector: React.FC<EventLineUpProps> = ({ onEdit, onDelete }) => {
  const { businessDirector } = useAppSelector(selectAuth);

  return (
    <div className="gap-2 flex-col flex">
      {businessDirector.length > 0 &&
        businessDirector.map((director) => {
          return (
            <div
              key={director?.id}
              className="p-4 gap-4 rounded-md items-center flex justify-between w-full"
              style={{
                boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
              }}
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#f1f2f3] p-4 rounded-full">
                    <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
                      {director.firstName.slice(0, 1)?.toUpperCase() +
                        director.lastName.slice(0, 1)?.toUpperCase()}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-normal text-greyColr">
                      {director.firstName + " " + director.lastName}{" "}
                    </h2>
                    <p className="text-xs text-lightGreyColor">
                      {director.email}
                    </p>
                    <div className="text-sm font-medium rounded-md p-1 flex gap-4">
                      <p className="text-greyColr font-workSans leading-4 font-medium text-sm flex gap-2 items-center">
                        {director.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 items-center h-full">
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => onEdit(director)}
                  />

                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={() => onDelete(director.id as number)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AddedDirector;
