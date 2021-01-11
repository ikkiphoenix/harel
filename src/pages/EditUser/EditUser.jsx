import {useEffect,useState,useRef} from 'react';
import styles from './EditUser.module.css';
import Button from '../../components/common/Button/Button';
import Input from "../../components/common/Input/Input";
import useRequest from '../../request/useRequest';
import instance from '../../request/instance';

const EditUser = ({match,history,...props}) => {

    const {id} = match.params;

    const [data] = useRequest({url:`/users/${id}`});
    const [user,setUser] = useState({});
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const accountRef = useRef();

    useEffect(() => {

        const {firstName,lastName,account} = data || {};
        setUser({
            firstName,
            lastName,
            account
        })
    },[data])

    const handleBack = () => {
        history.goBack();
    }

    const handleChange = e => {
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        });
    }

    const onSave = async () => {
        const req = await instance.post(`users/${id}`,user);
        if(req.status === 200) history.goBack();
    }

    const {firstName,lastName,account} = user; 

    return <div className="container">
        <h1>User's details</h1>
        <Input name="firstName" defaultValue={firstName} onChange={handleChange}/>
        <Input name="lastName" defaultValue={lastName} onChange={handleChange}/>
        <Input name="account" defaultValue={account} onChange={handleChange}/>
        <div className={styles.container__button}>
            <Button title="Save" color="primary" onClick={onSave}/>
            <Button title="Back" color="secondary" onClick={handleBack}/>
        </div>
    </div>
}

export default EditUser;