import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signUp, logOut } from "actions/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSiginIn = (data) => {
    dispatch(signIn(data, navigate));
  };

  const handleSignUp = (data) => {
    dispatch(signUp(data, navigate));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return {
    handleSignUp,
    handleSiginIn,
    handleLogOut,
  };
};
