/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { TResponse } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import UNForm from '../components/form/UNForm';
import UNInput from '../components/form/UNInput';
import { useChangePasswordMutation } from '../redux/features/admin/usermanagement.api';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <UNForm onSubmit={onSubmit}>
        <UNInput type="text" name="oldPassword" label="Old Password" />
        <UNInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Update</Button>
      </UNForm>
    </Row>
  );
};

export default ChangePassword;