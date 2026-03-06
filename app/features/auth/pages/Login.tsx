import { useLocation, useNavigate } from "react-router";
import AuthPageWrapper from "../components/AuthPageWrapper";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      toast.success(message, { id: "auth-message" });
      navigate(".", { replace: true, state: {} });
    }
  }, []);

  return <AuthPageWrapper content={<LoginForm />} />;
};

export default Login;
