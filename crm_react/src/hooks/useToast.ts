import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export const useToast = () => {
  const navigate = useNavigate();
  const handleDisplayBanner = async (
    func: Promise<
      { data: any } | { error: SerializedError | FetchBaseQueryError }
    >,
    messageLoading?: string,
    messageSuccess?: string,
    messageError?: string
  ) => {
    await toast.promise(func, {
      loading: messageLoading || `Loading`,
      success: (
        data:
          | {
              data: any;
            }
          | {
              error: FetchBaseQueryError | SerializedError;
            }
      ) => {
        if ("error" in data)
          if ("status" in data.error)
            throw new Error(String(data.error.status));
        if (messageSuccess?.includes("Added team")) navigate("/teams");
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
