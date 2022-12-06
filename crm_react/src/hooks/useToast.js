import { toast } from "react-hot-toast";

export const useToast = () => {
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
