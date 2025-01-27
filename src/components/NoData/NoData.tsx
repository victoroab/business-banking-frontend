import { NotFoundIcon } from "../../assets/svg/dashboard";

const NoData = () => {
  return (
    <div className="flex justify-center items-center flex-col py-40">
      <NotFoundIcon />
      <h3>No Records Found</h3>
      <p>Try adjusting your filters or come back later.</p>
    </div>
  );
};

export default NoData;
