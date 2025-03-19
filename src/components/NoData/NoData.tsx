import { NotFoundIcon } from "../../assets/svg/dashboard";

const NoData = ({
  title,
  paragraph,
}: {
  title?: string;
  paragraph?: string;
}) => {
  return (
    <div className="flex justify-center items-center flex-col py-40">
      <NotFoundIcon />
      <h3>{title || "Nothing to see yet"}</h3>
      <p>
        {paragraph ||
          "Send or receive some money to see your transactions here."}
      </p>
    </div>
  );
};

export default NoData;
