import { users } from "../../../../utils";
import { DeleteIcon, EditIcon } from "../../../../assets/svg/Accout";
import { User } from "../../../../interfaces/Global";
import { useGetAllBusinessUserQuery } from "../../../../service/user";
import { useEffect } from "react";
import Spinner from "../../../../components/Spinner/Spinner";

// interface EventLineUpProps {
//   onEdit: (director: User) => void;
//   onDelete: (id: number) => void;
// }
const SuperAdmin = () => {
  const { data, refetch, isLoading } = useGetAllBusinessUserQuery({});
  console.log(data?.data);
  const onEdit = (user: User) => {
    console.log(user);
  };
  const onDelete = (id: number) => {
    console.log(id);
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {users.map((user: User) => {
            return (
              <div
                key={user?.id}
                className="p-4 gap-4 rounded-md items-center flex justify-between w-full"
                style={{
                  boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                }}
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#f1f2f3] p-4 rounded-full">
                      <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
                        {user.firstName.slice(0, 1)?.toUpperCase() +
                          user.lastName.slice(0, 1)?.toUpperCase()}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm font-normal text-greyColr">
                        {user.firstName + " " + user.lastName}{" "}
                      </h2>
                      <p className="text-xs text-lightGreyColor">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center justify-end h-full">
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => onEdit(user)}
                      />

                      <DeleteIcon
                        className="cursor-pointer"
                        onClick={() => onDelete(user.id as number)}
                      />
                    </div>
                    <div className="text-sm font-medium flex items-end">
                      <p className="text-greyColr font-workSans leading-4 font-normal text-xs flex gap-2 items-center">
                        Added {user.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SuperAdmin;
