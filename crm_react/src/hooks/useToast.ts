// @ts-nocheck
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useToast = () => {
  const navigate = useNavigate();
  const handleDisplayBanner = async (
    func,
    messageLoading,
    messageSuccess,
    messageError
  ) => {
    await toast.promise(func, {
      loading: messageLoading || `Loading`,
      success: (data) => {
        if (data.error) throw new Error(data.error.status);
        if (messageSuccess.includes("Added team")) navigate("/teams");
        return messageSuccess || `Success`;
      },
      error: (er) => {
        console.log(er);
        return messageError || `Error! Try again later!`;
      },
    });
  };
  return { handleDisplayBanner };
};
