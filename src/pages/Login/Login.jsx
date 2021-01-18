import React, { useState, useCallback,useMemo } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import SpinnerLoading from "../../components/common/SpinnerLoading/SpinnerLoading";
import CenterItems from "../../components/common/UI/CenterItems/CenterItems";
import Container from "../../components/common/UI/Container/Container";
import instance from "../../request/instance";
import { SetUser } from "../../store/actions/actionUser";
import {
  validateEmail,
  validateEmpty,
  validatePassword,
} from "../../utils/validation";

const Login = ({ history, ...props }) => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [firstTimeInput, setFirstTimeInput] = useState({});

  const setUserGD = useCallback(
    (token) => {
      dispatch({ type: SetUser, value: { token } });
    },
    [dispatch]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    if (!firstTimeInput[name]) {
      setFirstTimeInput({
        ...firstTimeInput,
        [name]: true,
      });
    }
    isValidInput(name, value);
    if (buttonDisabled) setButtonDisabled(false);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const isValidInput = (name, value) => {
    let isValid = false;
    if (name === "email") isValid = validateEmail(value);
    else if (name === "password") isValid = validatePassword(value);
    else isValid = validateEmpty(value);

    setError({
      ...error,
      [name]: isValid,
    });
  };

  const isValidForm = () => {
    const listValues = Object.values(error).filter((v) => !Boolean(v));
    return listValues.length === 0;
  };

  const onConnect = async () => {
    const { email, firstName, lastName, password } = user;
    setButtonDisabled(true);
    if (!email || !firstName || !lastName || !password) return;
    if (!isValidForm()) return;
    setLoading(true);
    try {
      const req = await instance.post("login", user);
      const { status, data } = req;
      if (status === 200) {
        const { token } = data;
        setUserGD(token);
        history.push("/home");
      } else setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const listInput = useMemo(() => [
      {name:"email",type:"text",placeholder:"Email",error:!error.email && firstTimeInput.email},
      {name:"firstName",type:"text",placeholder:"First Name",error:!error.firstName && firstTimeInput.firstName},
      {name:"lastName",type:"text",placeholder:"Last Name",error:!error.lastName && firstTimeInput.lastName},
      {name:"password",type:"password",placeholder:"Password",error:!error.password && firstTimeInput.password}
  ], [error,firstTimeInput]);

  return (
    <Container>
      {listInput.map(({name,type,placeholder,error}) => <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
      />)}
      <Button
        title="Enter"
        color="primary"
        onClick={onConnect}
        disabled={buttonDisabled}
      />
      <CenterItems>
        <SpinnerLoading loading={loading} />
      </CenterItems>
    </Container>
  );
};

export default Login;
