import React, { useState } from "react";
import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { KYCPageProps } from "../../../../../interfaces/Global";
import { useSelector } from "react-redux";
import { selectGlobal } from "../../../../../store/slice/globalSlice";
import { electricityProvider } from "../../../../../utils";
const Package: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const { selectedElectricityProvider } = useSelector(selectGlobal);

  const selectedProviderPackages = electricityProvider?.find(
    (option: any) => selectedElectricityProvider === option?.title
  );

  console.log(selectedProviderPackages);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleNavigate = (title: string) => {
    setSelectedCategory(title);

    setCurrentStep(5);
    // setScreen(title);
  };

  console.log(selectedCategory);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Electricity Package
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select the package you want to buy from
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {selectedProviderPackages?.package?.map((option: any, index) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={index}
            onClick={() => handleNavigate(option?.title)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                  {option?.title}
                </h2>
              </div>
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
