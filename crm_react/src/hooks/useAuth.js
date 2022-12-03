import {
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
} from "reducers/authApiSlice";
import { apiSlice } from "api/apiSlice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logOut] = useLogOutMutation();

  const handleSiginIn = async (formData) => {
    try {
      await signIn(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      console.log(formData);
      await signUp(formData);
      handleSiginIn(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      dispatch(apiSlice.util.resetApiState());
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleSignUp,
    handleSiginIn,
    handleLogOut,
  };
};
