import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { UserDataType, UserType } from '../../types'
import style from './PhoneChangeForm.module.css'
// import { useAppDispatch } from '../../../redux/hooks'
// import { fetchUpd } from '../../../redux/user/userThunkActions'
import Input from '../Input/Input'
import Button from '../Button/Button'

export default function PhoneChahgeForm({
  user,
  setActive,
}: {
  user: UserDataType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  // const dispatch = useAppDispatch()

  type DataType = {
    phone: string;
  };

  const initialState = {
    phone: user?.phoneNumber || "",
  };

  const [input, setInput] = useState<DataType>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const changePhone = async (): Promise<void> => {
    const updUser = {
      ...user,
      phone: input.phone,
    };
    console.log("🚀 ~ changeInitials ~ updUser:", updUser);
    try {
      console.log("changeInitials сработал");
      // await dispatch(fetchUpd(updUser))
      setActive((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={`${style.form}`}>
        <h3>Телефон</h3>
        <Input
          type="text"
          name="phone"
          onChange={changeHandler}
          value={input.phone}
        />
        <Button onClick={() => void changePhone()}>Сохранить телефон</Button>
      </div>
    </div>
  );
}
