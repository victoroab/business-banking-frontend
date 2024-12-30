const NotificationPreference = () => {
  // const preference = [
  //     {id: 1, title: "Payment (Credit)"},
  //     {id: 2, title: "Email"},
  //     {id: 3, title: "Whatsapp"},
  //     {id: 4, title: "Whatsapp"},
  //     {id: 5, title: "Payment (Credit)"}

  // ]
  return (
    <div className="flex px-8 flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Notification Preferences
        </h3>
      </div>

      <div
        className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <div className="flex justify-between items-center gap-6"></div>
      </div>

      <div
        className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <div className="flex justify-between items-center gap-6"></div>
      </div>
    </div>
  );
};

export default NotificationPreference;
