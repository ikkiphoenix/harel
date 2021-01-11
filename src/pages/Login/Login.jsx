import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/common/Button/Button';
import Input from "../../components/common/Input/Input"
import instance from '../../request/instance';
import { SetUser } from '../../store/actions/actionUser';
import { validateEmail, validateEmpty, validatePassword } from '../../utils/validation';

const Login = ({history,...props}) => {
    const dispatch = useDispatch();
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [user,setUser] = useState({});
    const [error,setError] = useState({});
    const [firstTimeInput,setFirstTimeInput] = useState({});

    const onChange = e => {
        const {name,value} = e.target;
        if(!firstTimeInput[name]) {
            setFirstTimeInput({
                ...firstTimeInput,
                [name]:true
            });
        }
        isValidInput(name,value);
        setUser({
            ...user,
            [name]:value
        });
    }

    const isValidInput = (name,value) => {
        let isValid = false;
        if(name === "email") isValid = validateEmail(value);
        else if(name === "password") isValid = validatePassword(value);
        else isValid = validateEmpty(value);

        setError({
            ...error,
            [name]:isValid
        });
    }

    const isValidForm = () => {
        const listValues = Object.values(error).filter(v => !Boolean(v));
        return listValues.length === 0;
    }

    const onConnect = async() => {
        const {email,firstName,lastName,password} = user;
        if(!email || !firstName || !lastName || !password) return;
        if(!isValidForm()) return;
        setButtonDisabled(true);
        const req = await instance.post('login',user);
        setButtonDisabled(false);
        const {status,data} = req;
        if(status === 200) {
            const {token} = data;
            dispatch({type:SetUser,value:{token}});
            history.push('/home');
        }
    }

    return <div className="container">
        <Input name="email" type='text' placeholder="Email" onChange={onChange} error={!error.email && firstTimeInput.email}/>
        <Input name="firstName" type='text' placeholder="First Name"onChange={onChange} error={!error.firstName && firstTimeInput.firstName}/>
        <Input name="lastName" type='text' placeholder="Last Name" onChange={onChange} error={!error.lastName && firstTimeInput.lastName}/>
        <Input name="password" type='password' placeholder="Password" onChange={onChange} error={!error.password && firstTimeInput.password}/>
        <Button title="Enter" color="primary" onClick={onConnect} disabled={buttonDisabled}/>
    </div>;
}

export default Login;