import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, updateUserError } = useSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Когда пользователь загрузился - устанавливаем значения
  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
        password: ''
      };
      setFormValue(userData);
      setInitialValues(userData);
    }
  }, [user]);

  // Проверяем, изменились ли данные
  const isFormChanged =
    formValue.name !== initialValues.name ||
    formValue.email !== initialValues.email ||
    formValue.password !== '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: { name?: string; email?: string; password?: string } =
      {};
    if (formValue.name !== initialValues.name) updatedData.name = formValue.name;
    if (formValue.email !== initialValues.email) updatedData.email = formValue.email;
    if (formValue.password) updatedData.password = formValue.password;
    
    dispatch(updateUser(updatedData));
    
    // После отправки обновляем исходные значения
    setInitialValues({
      name: formValue.name,
      email: formValue.email,
      password: ''
    });
    setFormValue(prev => ({ ...prev, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: initialValues.name,
      email: initialValues.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError || undefined}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
