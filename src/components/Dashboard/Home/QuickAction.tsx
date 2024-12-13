import { quickActions } from "../../../utils";

const QuickAction = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="quick-action font-workSans font-medium text-xl ">
        Quick Actions
      </h3>
      <div className="flex justify-center items-center gap-40 bg-white rounded-lg p-10">
        {quickActions?.map((action: any) => (
          <div
            className="items-center justify-center flex flex-col gap-2"
            key={action.id}
          >
            <div className="icon w-[40px] h-[45px] bg-pryColor-Light rounded-md flex justify-center items-center">
              <action.icon />
            </div>
            <p className="title font-workSans text-sm font-medium">
              {action.title}
            </p>
            <p className="desc font-workSans text-sm font-normal">
              {action.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAction;
