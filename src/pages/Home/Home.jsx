import React from "react";
import { useDispatch } from "react-redux";
import Input from "../../components/common/Input/Input";
import TableHarel from "../../components/TableHarel/TableHarel";
import { SetGlobalFilterData } from "../../store/actions/actionData";
import styles from "./Home.module.css";
const Home = React.memo((props) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch({ type: SetGlobalFilterData, value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <Input placeholder="Global Filter" onChange={handleChange} />
      </div>
      <TableHarel />
    </div>
  );
});

export default Home;
