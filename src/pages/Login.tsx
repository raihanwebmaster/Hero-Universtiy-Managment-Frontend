/** @format */

import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UNForm from "../components/form/UNForm";
import UNInput from "../components/form/UNInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
const defaultValues = {
  userId: '0001',
  password: "ADMIN12345"
}
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong!!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <UNForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UNInput type='text' name='userId' label='ID' />
        <UNInput type='password' name='password' label='Password' />
        <Button htmlType='submit'>Login</Button>
      </UNForm>
    </Row>
  );
};

export default Login;
