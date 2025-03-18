import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KBrandIcon } from "../../../assets/svg/Alert";
import { useAcceptInvitationMutation } from "../../../service/auth";
import { errorHandler } from "../../../utils";

const InviteAccept: React.FC = () => {
  const navigate = useNavigate();
  const [acceptInvitation] = useAcceptInvitationMutation();

  const processInvitation = async () => {
    try {
      const url = window.location.href;
      const token = url.split("/").pop();

      const requiredData = {
        token: token as string,
      };

      const response = await acceptInvitation(requiredData).unwrap();
      if (response?.status === "success") {
        const action = response?.data?.action;
        if (action === "LOGIN") {
          navigate("/login");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    processInvitation();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-6 items-center">
      <KBrandIcon />
      <h1 className="font-bricolage text-3xl">Processing invitation</h1>
      <p className="font-workSans">Processing invitation...</p>
    </div>
  );
};

export default InviteAccept;
