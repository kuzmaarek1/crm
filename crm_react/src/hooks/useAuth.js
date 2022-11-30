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

  /*
  const signUpAndMember = async (request, id) => {
    const { username } = request;
    await signUp(request);
    try {
      await api.addMember(id, { username });
    } catch (e) {
      alert("Don't add member ");
    }
  };
*/

  return {
    handleSignUp,
    handleSiginIn,
    handleLogOut,
  };
};
