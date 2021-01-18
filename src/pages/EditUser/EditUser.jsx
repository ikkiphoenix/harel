import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./EditUser.module.css";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import useRequest from "../../request/useRequest";
import instance from "../../request/instance";
import SpinnerLoading from "../../components/common/SpinnerLoading/SpinnerLoading";
import CenterItems from "../../components/common/UI/CenterItems/CenterItems";
import Container from "../../components/common/UI/Container/Container";
import { SetReloadData } from "../../store/actions/actionData";

const EditUser = ({ match, history, ...props }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const [data, loading] = useRequest({ url: `/users/${id}` });
  const [loadingSave, setLoadingSave] = useState(false);
  const [user, setUser] = useState({});

  const setReloadData = useCallback(() => {
    dispatch({ type: SetReloadData, value: true });
  }, [dispatch]);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSave = async () => {
    setLoadingSave(true);
    try {
      const req = await instance.post(`users/${id}`, user);
      setReloadData();
      if (req.status === 200) history.goBack();
    } catch (error) {
      console.log(error);
      setLoadingSave(false);
    }
  };

  return (
    <Container>
      <h1>User's details</h1>
      {data && (
        <>
          {Object.keys(data).map((d) => (
            <Input name={d} defaultValue={data[d]} onChange={handleChange} />
          ))}
          <div className={styles.container__button}>
            <Button title="Save" color="primary" onClick={onSave} />
            <Button title="Back" color="secondary" onClick={handleBack} />
          </div>
        </>
      )}
      <CenterItems>
        <SpinnerLoading loading={loading || loadingSave} size="5x" />
      </CenterItems>
    </Container>
  );
};

export default EditUser;
